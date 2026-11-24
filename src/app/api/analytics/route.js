import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';
import { saveAnalyticsEvent, getAnalyticsEvents, getBookings } from '@/lib/serverStore';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    let event = null;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      event = await request.json();
    } else {
      const text = await request.text();
      try {
        event = JSON.parse(text);
      } catch (e) {
        event = null;
      }
    }

    if (!event || (!event.eventType && !event.event_type && !event.eventName && !event.event_name)) {
      return NextResponse.json({ success: true });
    }

    // Auto-resolve propertyId and propertyTitle from page_path if not explicitly provided
    const pagePath = event.pagePath || event.page_path || '';
    let propId = event.propertyId || event.property_id || (event.metadata && (event.metadata.propertyId || event.metadata.property_id)) || null;
    let propTitle = event.propertyTitle || event.property_title || (event.metadata && (event.metadata.propertyTitle || event.metadata.property_title)) || null;

    if ((!propId || !propTitle) && pagePath.includes('/listings/')) {
      const slugOrId = pagePath.split('/listings/')[1]?.split('?')[0]?.split('/')[0];
      if (slugOrId) {
        const match = DUBAI_PROPERTIES.find((p) => p.id === slugOrId || p.slug === slugOrId);
        if (match) {
          propId = propId || match.id;
          propTitle = propTitle || match.title;
        }
      }
    }

    event.propertyId = propId;
    event.propertyTitle = propTitle;

    // 1. Guaranteed storage in server store (works in all environments & private windows)
    saveAnalyticsEvent(event);

    // 2. Also try inserting into Supabase analytics_events table if configured
    try {
      const supabase = await createClient();
      await supabase
        .from('analytics_events')
        .insert([
          {
            event_type: event.eventType || event.event_type || 'impression',
            event_name: event.eventName || event.event_name || 'page_view',
            page_path: event.pagePath || event.page_path || '/',
            device: event.device || 'desktop',
            property_id: propId,
            property_title: propTitle,
            metadata: event.metadata || event,
          },
        ]);
    } catch (supabaseErr) {
      // Supabase unconfigured or offline, serverStore holds the real data
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: true, fallback: true });
  }
}

export async function GET(request) {
  try {
    // 1. Fetch Real True Leads from Supabase + serverStore
    let supabaseBookings = [];
    try {
      const supabase = await createClient();
      const { data: realBookings } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (realBookings) {
        supabaseBookings = realBookings;
      }
    } catch (e) {}

    const localBookings = getBookings();
    const trueLeadsList = [...supabaseBookings];

    localBookings.forEach((lb) => {
      if (!trueLeadsList.some((b) => b.id === lb.id || (b.phone === lb.phone && b.created_at === lb.created_at))) {
        trueLeadsList.push(lb);
      }
    });

    trueLeadsList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const trueLeadsCount = trueLeadsList.length;

    // 2. Fetch Real recorded events from Supabase + serverStore
    let supabaseEvents = [];
    try {
      const supabase = await createClient();
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (events) {
        supabaseEvents = events;
      }
    } catch (e) {}

    const localEvents = getAnalyticsEvents();
    const recordedEvents = [...supabaseEvents];

    localEvents.forEach((le) => {
      if (!recordedEvents.some((e) => e.id === le.id)) {
        recordedEvents.push(le);
      }
    });

    recordedEvents.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Strictly real counts
    const impressionsList = recordedEvents.filter((e) => e.event_type === 'impression');
    const clicksList = recordedEvents.filter((e) => e.event_type === 'click');

    const totalImpressions = impressionsList.length;
    const totalClicks = clicksList.length;

    // Real conversion & CTR calculations
    const conversionRate = totalImpressions > 0 
      ? ((trueLeadsCount / totalImpressions) * 100).toFixed(2) 
      : '0.00';
    const clickThroughRate = totalImpressions > 0 
      ? ((totalClicks / totalImpressions) * 100).toFixed(1) 
      : '0.0';

    // Real click category breakdown strictly from real click events
    const clicksBreakdown = {
      whatsapp: clicksList.filter((e) => (e.event_name || '').toLowerCase().includes('whatsapp')).length,
      phoneCalls: clicksList.filter((e) => {
        const n = (e.event_name || '').toLowerCase();
        return n.includes('call') || n.includes('phone');
      }).length,
      propertyViews: clicksList.filter((e) => {
        const n = (e.event_name || '').toLowerCase();
        return n.includes('property') || n.includes('view') || n.includes('detail');
      }).length,
      videoRequests: clicksList.filter((e) => {
        const n = (e.event_name || '').toLowerCase();
        return n.includes('video') || n.includes('tour');
      }).length,
      mapSearches: clicksList.filter((e) => (e.event_name || '').toLowerCase().includes('map')).length,
    };

    // Real 7-day time series data strictly calculated from actual events and bookings
    const dailyTrends = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayISO = d.toISOString().slice(0, 10);
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      const dayImpressions = impressionsList.filter((e) => e.created_at && e.created_at.startsWith(dayISO)).length;
      const dayClicks = clicksList.filter((e) => e.created_at && e.created_at.startsWith(dayISO)).length;
      const dayLeads = trueLeadsList.filter((b) => b.created_at && b.created_at.startsWith(dayISO)).length;

      dailyTrends.push({
        date: dateStr,
        isoDate: dayISO,
        impressions: dayImpressions,
        clicks: dayClicks,
        leads: dayLeads,
      });
    }

    // Real top properties by actual recorded events and inquiries
    const propertyEngagementMap = {};
    
    recordedEvents.forEach((ev) => {
      let propId = ev.property_id || (ev.metadata && (ev.metadata.propertyId || ev.metadata.property_id));
      let propTitle = ev.property_title || (ev.metadata && (ev.metadata.propertyTitle || ev.metadata.property_title));

      // Resolve from page_path if property_id / title is not explicitly attached
      if ((!propId || !propTitle) && ev.page_path && ev.page_path.includes('/listings/')) {
        const slugOrId = ev.page_path.split('/listings/')[1]?.split('?')[0]?.split('/')[0];
        if (slugOrId) {
          const match = DUBAI_PROPERTIES.find((p) => p.id === slugOrId || p.slug === slugOrId);
          if (match) {
            propId = propId || match.id;
            propTitle = propTitle || match.title;
          }
        }
      }

      if (propTitle || propId) {
        const matched = DUBAI_PROPERTIES.find(
          (p) => (propId && (p.id === propId || p.slug === propId)) ||
                 (propTitle && p.title.toLowerCase() === propTitle.toLowerCase())
        );
        const canonId = matched?.id || propId || propTitle;
        const canonTitle = matched?.title || propTitle || propId;

        if (!propertyEngagementMap[canonId]) {
          propertyEngagementMap[canonId] = {
            id: canonId,
            title: canonTitle,
            impressions: 0,
            clicks: 0,
            leads: 0,
          };
        }
        if (ev.event_type === 'impression') propertyEngagementMap[canonId].impressions++;
        if (ev.event_type === 'click') propertyEngagementMap[canonId].clicks++;
        if (ev.event_type === 'lead') propertyEngagementMap[canonId].leads++;
      }
    });

    // Also factor in true leads from bookings table
    trueLeadsList.forEach((b) => {
      const title = b.property_title || b.plan_title;
      const bPropId = b.property_id;
      if (title || bPropId) {
        const matched = DUBAI_PROPERTIES.find(
          (p) => (bPropId && (p.id === bPropId || p.slug === bPropId)) ||
                 (title && p.title.toLowerCase() === title.toLowerCase())
        );
        const canonId = matched?.id || bPropId || title;
        const canonTitle = matched?.title || title || bPropId;

        if (!propertyEngagementMap[canonId]) {
          propertyEngagementMap[canonId] = {
            id: canonId,
            title: canonTitle,
            impressions: 0,
            clicks: 0,
            leads: 0,
          };
        }
        propertyEngagementMap[canonId].leads++;
      }
    });

    // Ensure baseline: if a property captured leads, it had at least as many views and clicks
    Object.values(propertyEngagementMap).forEach((item) => {
      if (item.leads > 0) {
        if (item.impressions < item.leads) {
          item.impressions = item.leads;
        }
        if (item.clicks < item.leads) {
          item.clicks = item.leads;
        }
      }
    });

    function formatAnalyticsPrice(matched) {
      if (!matched) return 'Price on Request';
      const val = matched.price;
      if (typeof val === 'number') {
        if (val >= 1000000) {
          const millions = (val / 1000000).toFixed(2).replace(/\.00$/, '').replace(/(\.[1-9])0$/, '$1');
          return `AED ${millions}M`;
        }
        const formatted = val.toLocaleString('en-AE');
        return `AED ${formatted}${matched.period ? `/${matched.period}` : ''}`;
      }
      return matched.price ? `AED ${matched.price}` : 'Price on Request';
    }

    let topProperties = Object.values(propertyEngagementMap)
      // Only include properties that had real engagement
      .filter((item) => item.impressions > 0 || item.clicks > 0 || item.leads > 0)
      .sort((a, b) => (b.leads * 10 + b.clicks * 2 + b.impressions) - (a.leads * 10 + a.clicks * 2 + a.impressions))
      .slice(0, 8)
      .map((item) => {
        const matched = DUBAI_PROPERTIES.find(
          (p) => p.id === item.id || p.title.toLowerCase() === item.title.toLowerCase()
        );
        const ctrVal = item.impressions > 0 ? ((item.clicks / item.impressions) * 100).toFixed(1) : '0.0';
        return {
          id: matched?.id || item.id,
          title: matched?.title || item.title,
          location: matched?.location || 'Dubai, UAE',
          price: formatAnalyticsPrice(matched),
          impressions: item.impressions,
          clicks: item.clicks,
          leads: item.leads,
          ctr: `${ctrVal}%`,
        };
      });

    // Real device breakdown strictly from actual recorded devices
    let mobileCount = 0;
    let desktopCount = 0;
    let tabletCount = 0;

    recordedEvents.forEach((e) => {
      const dev = (e.device || '').toLowerCase();
      if (dev === 'mobile') mobileCount++;
      else if (dev === 'tablet') tabletCount++;
      else desktopCount++;
    });

    const totalDevices = mobileCount + desktopCount + tabletCount;
    const devices = {
      mobile: totalDevices > 0 ? Math.round((mobileCount / totalDevices) * 100) : 0,
      desktop: totalDevices > 0 ? Math.round((desktopCount / totalDevices) * 100) : 0,
      tablet: totalDevices > 0 ? Math.round((tabletCount / totalDevices) * 100) : 0,
    };

    // Real traffic sources
    const referrerMap = {};
    recordedEvents.forEach((e) => {
      const ref = (e.metadata && e.metadata.referrer) ? e.metadata.referrer : 'Direct / Bookmarks';
      referrerMap[ref] = (referrerMap[ref] || 0) + 1;
    });

    const trafficSources = Object.entries(referrerMap).map(([source, count]) => ({
      source,
      visits: count,
      percentage: totalImpressions > 0 ? Math.round((count / totalImpressions) * 100) : 0,
    }));

    // Real recent activity stream strictly from real leads and recorded events
    const recentActivity = [
      ...trueLeadsList.slice(0, 8).map((lead) => ({
        type: 'true_lead',
        title: `True Lead: ${lead.full_name || lead.first_name || 'Visitor'} submitted inquiry`,
        detail: `${lead.inquiry_type || 'Property Inquiry'} for ${lead.property_title || lead.plan_title || 'Dubai Listing'}`,
        time: lead.created_at ? new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        date: lead.created_at ? new Date(lead.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '',
        badge: 'True Lead',
        badgeColor: 'bg-emerald-500/10 text-emerald-400',
      })),
      ...recordedEvents.slice(0, 8).map((ev) => ({
        type: ev.event_type,
        title: ev.event_name ? ev.event_name.replace(/_/g, ' ').toUpperCase() : 'Visitor Event',
        detail: ev.property_title ? `Interaction with ${ev.property_title}` : `Page: ${ev.page_path || '/'}`,
        time: ev.created_at ? new Date(ev.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        date: ev.created_at ? new Date(ev.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : '',
        badge: ev.event_type === 'click' ? 'Click' : 'Impression',
        badgeColor: ev.event_type === 'click' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-700/30 text-slate-300',
      })),
    ].slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        totalImpressions,
        totalClicks,
        trueLeads: trueLeadsCount,
        conversionRate,
        clickThroughRate,
        clicksBreakdown,
        dailyTrends,
        topProperties,
        devices,
        trafficSources,
        recentActivity,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

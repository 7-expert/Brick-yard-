import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DUBAI_PROPERTIES } from '@/data/dubaiProperties';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const event = await request.json();
    const supabase = await createClient();

    // Insert into Supabase analytics_events table if configured
    await supabase
      .from('analytics_events')
      .insert([
        {
          event_type: event.eventType || 'impression',
          event_name: event.eventName || 'page_view',
          page_path: event.pagePath || '/',
          device: event.device || 'desktop',
          property_id: event.propertyId || null,
          property_title: event.propertyTitle || null,
          metadata: event,
        },
      ])
      .select()
      .maybeSingle();

    return NextResponse.json({ success: true });
  } catch (err) {
    // Graceful return 200 so client analytics never fail user requests
    return NextResponse.json({ success: true, fallback: true });
  }
}

export async function GET(request) {
  try {
    const supabase = await createClient();

    // 1. Fetch Real True Leads strictly from Supabase bookings table
    let trueLeadsList = [];
    try {
      const { data: realBookings } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (realBookings) {
        trueLeadsList = realBookings;
      }
    } catch (e) {
      trueLeadsList = [];
    }

    const trueLeadsCount = trueLeadsList.length;

    // 2. Fetch Real recorded events strictly from analytics_events table
    let recordedEvents = [];
    try {
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (events) {
        recordedEvents = events;
      }
    } catch (e) {
      recordedEvents = [];
    }

    // Strictly real recorded counts - NO mock baselines, NO fake multipliers
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
      whatsapp: clicksList.filter((e) => e.event_name?.includes('whatsapp')).length,
      phoneCalls: clicksList.filter((e) => e.event_name?.includes('call') || e.event_name?.includes('phone')).length,
      propertyViews: clicksList.filter((e) => e.event_name?.includes('property') || e.event_name?.includes('view')).length,
      videoRequests: clicksList.filter((e) => e.event_name?.includes('video') || e.event_name?.includes('tour')).length,
      mapSearches: clicksList.filter((e) => e.event_name?.includes('map')).length,
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
      const propId = ev.property_id || (ev.metadata && ev.metadata.propertyId);
      const propTitle = ev.property_title || (ev.metadata && ev.metadata.propertyTitle);
      if (propTitle || propId) {
        const key = propTitle || propId;
        if (!propertyEngagementMap[key]) {
          propertyEngagementMap[key] = {
            id: propId || key,
            title: propTitle || key,
            impressions: 0,
            clicks: 0,
            leads: 0,
          };
        }
        if (ev.event_type === 'impression') propertyEngagementMap[key].impressions++;
        if (ev.event_type === 'click') propertyEngagementMap[key].clicks++;
      }
    });

    // Also factor in actual bookings referencing properties
    trueLeadsList.forEach((b) => {
      const title = b.property_title || b.plan_title;
      if (title) {
        if (!propertyEngagementMap[title]) {
          propertyEngagementMap[title] = {
            id: b.property_id || title,
            title,
            impressions: 0,
            clicks: 0,
            leads: 0,
          };
        }
        propertyEngagementMap[title].leads++;
      }
    });

    // Generate real top properties list
    let topProperties = Object.values(propertyEngagementMap)
      .sort((a, b) => (b.leads * 10 + b.clicks * 2 + b.impressions) - (a.leads * 10 + a.clicks * 2 + a.impressions))
      .slice(0, 6)
      .map((item) => {
        const matched = DUBAI_PROPERTIES.find((p) => p.title.toLowerCase() === item.title.toLowerCase() || p.id === item.id);
        const ctrVal = item.impressions > 0 ? ((item.clicks / item.impressions) * 100).toFixed(1) : '0.0';
        return {
          id: item.id,
          title: item.title,
          location: matched?.location || 'Dubai, UAE',
          price: matched?.priceAED ? `AED ${(matched.priceAED / 1000000).toFixed(1)}M` : matched?.price || 'Price on Request',
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

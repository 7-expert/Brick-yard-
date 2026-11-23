'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Eye,
  MousePointerClick,
  Users,
  TrendingUp,
  RefreshCw,
  Download,
  Smartphone,
  Laptop,
  Globe,
  MessageSquare,
  Phone,
  Video,
  MapPin,
  ExternalLink,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { formatNumber } from '@/lib/tokens';

export default function WebsiteAnalyticsView({ bookings = [] }) {
  const [timeRange, setTimeRange] = useState('7d'); // '7d' | '30d' | 'all'
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics');
      const json = await res.json();
      if (json.success) {
        setAnalyticsData(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch real analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Strictly 100% real data - NO mock numbers, NO fake multipliers
  const impressions = analyticsData?.totalImpressions || 0;
  const clicks = analyticsData?.totalClicks || 0;
  const leads = analyticsData?.trueLeads !== undefined ? analyticsData.trueLeads : bookings.length;
  const ctr = analyticsData?.clickThroughRate || (impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : '0.0');
  const conversionRate = analyticsData?.conversionRate || (impressions > 0 ? ((leads / impressions) * 100).toFixed(2) : '0.00');

  const exportAnalyticsCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Total Real Impressions (Page Views)', impressions],
      ['Total Real Engagement Clicks', clicks],
      ['Real True Leads (Bookings & Forms)', leads],
      ['Click-Through Rate (CTR)', `${ctr}%`],
      ['Lead Conversion Rate', `${conversionRate}%`],
      ['WhatsApp Inquiries (Clicks)', analyticsData?.clicksBreakdown?.whatsapp || 0],
      ['Direct Phone Calls (Clicks)', analyticsData?.clicksBreakdown?.phoneCalls || 0],
      ['Property Detail Views (Clicks)', analyticsData?.clicksBreakdown?.propertyViews || 0],
      ['Video Tour Requests', analyticsData?.clicksBreakdown?.videoRequests || 0],
      ['Map Searches', analyticsData?.clicksBreakdown?.mapSearches || 0],
      ['Time Range', timeRange],
      ['Exported At', new Date().toISOString()],
    ];

    const csvContent = '\uFEFF' + rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `brickyard_real_analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const dailyTrends = analyticsData?.dailyTrends || [];
  const maxImpression = Math.max(...dailyTrends.map((d) => d.impressions), 10);

  const clicksBreakdown = analyticsData?.clicksBreakdown || {
    whatsapp: 0,
    phoneCalls: 0,
    propertyViews: 0,
    videoRequests: 0,
    mapSearches: 0,
  };

  const topProperties = analyticsData?.topProperties || [];
  const devices = analyticsData?.devices || { mobile: 0, desktop: 0, tablet: 0 };
  const trafficSources = analyticsData?.trafficSources || [];
  const recentActivity = analyticsData?.recentActivity || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Header Toolbar: Borderless with soft shadow */}
      <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="font-serif text-2xl font-bold text-ink">Website Analytics</h2>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Real Data
            </span>
          </div>
          <p className="text-xs text-ink-soft mt-1">
            Real visitor impressions, interaction clicks, and database-verified True Leads.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={fetchAnalytics}
            className="p-2.5 bg-[#FAF8F5] hover:bg-cream/60 rounded-2xl text-ink-soft hover:text-ink transition-colors cursor-pointer shadow-xs"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-700' : ''}`} />
          </button>

          <button
            type="button"
            onClick={exportAnalyticsCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F5] hover:bg-cream/60 rounded-2xl text-xs font-semibold text-ink transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Core 4 Metric Cards: Borderless with soft backgrounds & shadows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Real Total Impressions */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-ink-soft">
              Real Impressions
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-ink">
                {formatNumber(impressions)}
              </span>
            </div>
            <p className="text-xs text-ink-soft mt-1.5">
              Live page views recorded across portal pages.
            </p>
          </div>
          <div className="pt-3 mt-4 flex items-center justify-between text-[11px] text-ink-soft bg-[#FAF8F5] -mx-6 -mb-6 px-6 py-3 rounded-b-3xl">
            <span>Status</span>
            <span className="font-semibold text-emerald-700">Live Capturing</span>
          </div>
        </div>

        {/* Metric 2: Real Total Clicks */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-ink-soft">
              Real Clicks
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#FF6B35] flex items-center justify-center">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-ink">
                {formatNumber(clicks)}
              </span>
              <span className="text-xs font-semibold text-amber-700">
                {ctr}% CTR
              </span>
            </div>
            <p className="text-xs text-ink-soft mt-1.5">
              WhatsApp, direct calls, listing cards & filter clicks.
            </p>
          </div>
          <div className="pt-3 mt-4 flex items-center justify-between text-[11px] text-ink-soft bg-[#FAF8F5] -mx-6 -mb-6 px-6 py-3 rounded-b-3xl">
            <span>Direct Inquiries</span>
            <span className="font-semibold text-ink">
              {(clicksBreakdown.whatsapp || 0) + (clicksBreakdown.phoneCalls || 0)} calls/chats
            </span>
          </div>
        </div>

        {/* Metric 3: Real True Leads (Form Submissions) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group transition-all bg-gradient-to-br from-white to-emerald-50/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
              True Leads
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#0A5C4F] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0A5C4F]">
                {leads}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                DB Verified
              </span>
            </div>
            <p className="text-xs text-ink-soft mt-1.5">
              Verified client bookings and inquiries in database.
            </p>
          </div>
          <div className="pt-3 mt-4 flex items-center justify-between text-[11px] text-emerald-900 font-medium bg-emerald-50/60 -mx-6 -mb-6 px-6 py-3 rounded-b-3xl">
            <span>Pending Review</span>
            <span className="font-bold text-amber-600">
              {bookings.filter((b) => b.status === 'pending').length} leads
            </span>
          </div>
        </div>

        {/* Metric 4: Real Conversion Rate */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-ink-soft">
              True Lead Conversion
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-ink">
                {conversionRate}%
              </span>
            </div>
            <p className="text-xs text-ink-soft mt-1.5">
              Verified inquiries divided by real visitor impressions.
            </p>
          </div>
          <div className="pt-3 mt-4 flex items-center justify-between text-[11px] text-ink-soft bg-[#FAF8F5] -mx-6 -mb-6 px-6 py-3 rounded-b-3xl">
            <span>Click-to-Lead</span>
            <span className="font-semibold text-ink">
              {clicks > 0 ? ((leads / clicks) * 100).toFixed(1) : '0.0'}%
            </span>
          </div>
        </div>

      </div>

      {/* 3. Daily Traffic Chart: Borderless container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-ink">
              Daily Real Traffic & Lead Trends
            </h3>
            <p className="text-xs text-ink-soft mt-0.5">
              Real recorded daily page impressions, clicks, and client form submissions.
            </p>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-ink-soft">Impressions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF6B35]"></span>
              <span className="text-ink-soft">Clicks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span className="text-ink-soft">True Leads</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-6 pb-2">
          {dailyTrends.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-[#FAF8F5] rounded-2xl">
              Live data tracker initialized. Daily trends will populate automatically as visits occur.
            </div>
          ) : (
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 px-2 bg-[#FAF8F5] rounded-2xl p-4">
              {dailyTrends.map((day, idx) => {
                const impHeight = day.impressions > 0 ? Math.max(14, Math.round((day.impressions / maxImpression) * 100)) : 4;
                const clickHeight = day.clicks > 0 ? Math.max(10, Math.round(((day.clicks * 3) / maxImpression) * 100)) : 4;
                const leadHeight = day.leads > 0 ? Math.max(8, Math.round(((day.leads * 20) / maxImpression) * 100)) : 4;
                const isHovered = hoveredBarIndex === idx;

                return (
                  <div
                    key={idx}
                    className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                  >
                    {isHovered && (
                      <div className="absolute -top-24 bg-slate-900 text-white rounded-2xl p-3 shadow-2xl text-xs z-30 whitespace-nowrap animate-fadeIn">
                        <p className="font-bold text-[11px] text-slate-300 pb-1 mb-1">
                          {day.date}
                        </p>
                        <div className="space-y-0.5 text-[11px]">
                          <p className="text-blue-300">Impressions: <strong>{day.impressions}</strong></p>
                          <p className="text-amber-300">Clicks: <strong>{day.clicks}</strong></p>
                          <p className="text-emerald-300">True Leads: <strong>{day.leads}</strong></p>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex items-end justify-center gap-1">
                      <div
                        style={{ height: `${impHeight}%` }}
                        className="w-1/3 max-w-[18px] bg-blue-500 rounded-t-md transition-all"
                      />
                      <div
                        style={{ height: `${clickHeight}%` }}
                        className="w-1/3 max-w-[18px] bg-[#FF6B35] rounded-t-md transition-all"
                      />
                      <div
                        style={{ height: `${leadHeight}%` }}
                        className="w-1/3 max-w-[18px] bg-emerald-600 rounded-t-md transition-all"
                      />
                    </div>

                    <span className="text-[11px] text-ink-soft font-medium mt-3">
                      {day.date.split(',')[0] || day.date}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Two-Column Breakdown: Clicks by Action & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Real Clicks by Action */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-ink">
              User Actions & Real Click Breakdown
            </h3>
            <span className="text-xs text-ink-soft font-semibold">{formatNumber(clicks)} total clicks</span>
          </div>

          <div className="space-y-4">
            {/* WhatsApp */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Inquiries</span>
                </span>
                <span className="text-ink font-bold">
                  {clicksBreakdown.whatsapp || 0}
                </span>
              </div>
              <div className="w-full bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#25D366] h-full rounded-full transition-all"
                  style={{ width: `${clicks > 0 ? ((clicksBreakdown.whatsapp / clicks) * 100) : 0}%` }}
                />
              </div>
            </div>

            {/* Property Detail Views */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full Property Detail Views</span>
                </span>
                <span className="text-ink font-bold">
                  {clicksBreakdown.propertyViews || 0}
                </span>
              </div>
              <div className="w-full bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${clicks > 0 ? ((clicksBreakdown.propertyViews / clicks) * 100) : 0}%` }}
                />
              </div>
            </div>

            {/* Phone Calls */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Direct Phone Calls</span>
                </span>
                <span className="text-ink font-bold">
                  {clicksBreakdown.phoneCalls || 0}
                </span>
              </div>
              <div className="w-full bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0A5C4F] h-full rounded-full transition-all"
                  style={{ width: `${clicks > 0 ? ((clicksBreakdown.phoneCalls / clicks) * 100) : 0}%` }}
                />
              </div>
            </div>

            {/* Video Tour Requests */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Video className="w-3.5 h-3.5 text-purple-600" />
                  <span>Video Tour Requests</span>
                </span>
                <span className="text-ink font-bold">
                  {clicksBreakdown.videoRequests || 0}
                </span>
              </div>
              <div className="w-full bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all"
                  style={{ width: `${clicks > 0 ? ((clicksBreakdown.videoRequests / clicks) * 100) : 0}%` }}
                />
              </div>
            </div>

            {/* Map Searches */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interactive Map Launches</span>
                </span>
                <span className="text-ink font-bold">
                  {clicksBreakdown.mapSearches || 0}
                </span>
              </div>
              <div className="w-full bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${clicks > 0 ? ((clicksBreakdown.mapSearches / clicks) * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real Device Breakdown */}
        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-ink">
              Visitor Devices & Traffic
            </h3>
            <span className="text-xs text-ink-soft font-semibold">Real Distribution</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-[#FAF8F5]">
              <Smartphone className="w-5 h-5 text-ink-soft mx-auto mb-1.5" />
              <span className="text-lg font-bold text-ink">{devices.mobile}%</span>
              <span className="text-[11px] text-ink-soft block">Mobile</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5]">
              <Laptop className="w-5 h-5 text-ink-soft mx-auto mb-1.5" />
              <span className="text-lg font-bold text-ink">{devices.desktop}%</span>
              <span className="text-[11px] text-ink-soft block">Desktop</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF8F5]">
              <Globe className="w-5 h-5 text-ink-soft mx-auto mb-1.5" />
              <span className="text-lg font-bold text-ink">{devices.tablet}%</span>
              <span className="text-[11px] text-ink-soft block">Tablet</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold text-slate-700">Tracked Traffic Channels</p>
            {trafficSources.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 bg-[#FAF8F5] p-3 rounded-2xl">
                Referral traffic channels will register here as visitors arrive from search, direct, or social links.
              </p>
            ) : (
              trafficSources.map((src, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-slate-700 font-medium">{src.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{src.visits} visits</span>
                    <span className="font-bold text-ink w-10 text-right">{src.percentage}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 5. Top Performing Properties Table: Borderless */}
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-ink">
              Top Interacted Properties (Views, Clicks & True Leads)
            </h3>
            <p className="text-xs text-ink-soft mt-0.5">
              Breakdown of real listing views and verified leads captured per property.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            Real Inquiries
          </span>
        </div>

        <div className="overflow-x-auto">
          {topProperties.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-[#FAF8F5] m-6 rounded-2xl">
              No individual property interactions recorded yet. Once visitors browse listings, engagement will rank here.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FAF8F5] text-xs uppercase tracking-wider text-ink-soft">
                  <th className="py-3 px-5 font-semibold">Property</th>
                  <th className="py-3 px-5 font-semibold">Location</th>
                  <th className="py-3 px-5 font-semibold">Price</th>
                  <th className="py-3 px-5 font-semibold text-center">Views</th>
                  <th className="py-3 px-5 font-semibold text-center">Clicks</th>
                  <th className="py-3 px-5 font-semibold text-center">True Leads</th>
                  <th className="py-3 px-5 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs text-ink">
                {topProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900 max-w-xs truncate">
                      {prop.title}
                    </td>
                    <td className="py-4 px-5 text-ink-soft">
                      {prop.location}
                    </td>
                    <td className="py-4 px-5 font-semibold text-emerald-800">
                      {prop.price}
                    </td>
                    <td className="py-4 px-5 text-center font-bold text-slate-800">
                      {formatNumber(prop.impressions)}
                    </td>
                    <td className="py-4 px-5 text-center font-bold text-[#FF6B35]">
                      {formatNumber(prop.clicks)}
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {prop.leads} Leads
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        href={`/listings/${prop.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0A5C4F] hover:underline"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 6. Live Activity Stream: Borderless */}
      <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-ink">
              Recent Visitor Activity (Real-Time Feed)
            </h3>
          </div>
          <span className="text-[11px] text-ink-soft">Live Event Stream</span>
        </div>

        {recentActivity.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 bg-[#FAF8F5] rounded-2xl">
            No live events recorded yet. As visitors browse and submit forms, their activity will stream here in real time.
          </div>
        ) : (
          <div className="space-y-2">
            {recentActivity.map((act, i) => (
              <div key={i} className="py-3 px-4 rounded-2xl bg-[#FAF8F5] flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${act.badgeColor}`}>
                    {act.badge}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{act.title}</span>
                    <span className="text-slate-500 text-[11px]">{act.detail}</span>
                  </div>
                </div>
                <span className="text-slate-400 shrink-0 font-mono text-[11px]">{act.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

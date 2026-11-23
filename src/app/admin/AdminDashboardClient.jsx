'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  Filter,
  Download,
  Trash2,
  X,
  LogOut,
  CheckCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  RefreshCw,
  Phone,
  Mail,
  BarChart2,
  Users as UsersIcon,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import WebsiteAnalyticsView from '@/components/admin/WebsiteAnalyticsView';

export default function AdminDashboardClient({ user, initialBookings = [] }) {
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'analytics'
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [updatingNotes, setUpdatingNotes] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [realtimeConnected, setRealtimeConnected] = useState(false);

  // Setup Supabase Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('public:bookings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookings((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setBookings((prev) =>
              prev.map((b) => (b.id === payload.new.id ? payload.new : b))
            );
            if (selectedBooking && selectedBooking.id === payload.new.id) {
              setSelectedBooking(payload.new);
            }
          } else if (payload.eventType === 'DELETE') {
            setBookings((prev) => prev.filter((b) => b.id !== payload.old.id));
            if (selectedBooking && selectedBooking.id === payload.old.id) {
              setSelectedBooking(null);
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, selectedBooking]);

  const fetchLatest = async () => {
    try {
      const res = await fetch('/api/bookings');
      const json = await res.json();
      if (json.success && json.bookings) {
        setBookings(json.bookings);
        return;
      }
    } catch (e) {}

    try {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setBookings(data);
    } catch (e) {}
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {}
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    router.push('/admin/login');
    router.refresh();
  };

  // Status counts (Strictly real data)
  const counts = useMemo(() => {
    const res = { total: bookings.length, pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    bookings.forEach((b) => {
      if (res[b.status] !== undefined) {
        res[b.status] += 1;
      }
    });
    return res;
  }, [bookings]);

  // Filtering
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) {
        return false;
      }

      if (startDate) {
        const bDate = new Date(b.created_at);
        const sDate = new Date(startDate);
        if (bDate < sDate) return false;
      }
      if (endDate) {
        const bDate = new Date(b.created_at);
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        if (bDate > eDate) return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const name = (b.full_name || `${b.first_name || ''} ${b.last_name || ''}`).toLowerCase();
        const email = (b.email || '').toLowerCase();
        const phone = (b.phone || '').toLowerCase();
        const inquiry = (b.inquiry_type || '').toLowerCase();
        const item = (b.property_title || b.plan_title || '').toLowerCase();
        const msg = (b.message || '').toLowerCase();

        return (
          name.includes(q) ||
          email.includes(q) ||
          phone.includes(q) ||
          inquiry.includes(q) ||
          item.includes(q) ||
          msg.includes(q)
        );
      }

      return true;
    });
  }, [bookings, statusFilter, startDate, endDate, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / pageSize) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, page, pageSize]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (e) {}

    try {
      await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);
    } catch (e) {}

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleSaveNotes = async (id) => {
    setUpdatingNotes(true);
    try {
      await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, admin_notes: editingNotes }),
      });
    } catch (e) {}

    try {
      await supabase
        .from('bookings')
        .update({ admin_notes: editingNotes })
        .eq('id', id);
    } catch (e) {}

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, admin_notes: editingNotes } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => ({ ...prev, admin_notes: editingNotes }));
    }
    setUpdatingNotes(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/bookings?id=${id}`, {
        method: 'DELETE',
      });
    } catch (e) {}

    try {
      await supabase.from('bookings').delete().eq('id', id);
    } catch (e) {}

    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(null);
    }
    setDeleteConfirmId(null);
  };

  const exportCSV = () => {
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      return `"${String(val).replace(/"/g, '""')}"`;
    };

    const headers = [
      'ID',
      'Created At',
      'First Name',
      'Last Name',
      'Full Name',
      'Email',
      'Phone',
      'Country Code',
      'Inquiry Type',
      'Property / Item',
      'Status',
      'Message',
      'Admin Notes',
    ];

    const rows = filteredBookings.map((b) => {
      const derivedFirst = b.first_name || (b.full_name ? b.full_name.trim().split(/\s+/)[0] : '');
      const derivedLast = b.last_name || (b.full_name ? b.full_name.trim().split(/\s+/).slice(1).join(' ') : '');
      const derivedFull = b.full_name || `${b.first_name || ''} ${b.last_name || ''}`.trim();
      const formattedDate = b.created_at ? new Date(b.created_at).toISOString().replace('T', ' ').slice(0, 19) : '';
      const formattedPhone = b.phone ? `\t${b.phone}` : '';

      return [
        escapeCSV(b.id),
        escapeCSV(formattedDate),
        escapeCSV(derivedFirst),
        escapeCSV(derivedLast),
        escapeCSV(derivedFull),
        escapeCSV(b.email),
        escapeCSV(formattedPhone),
        escapeCSV(b.country_code),
        escapeCSV(b.inquiry_type),
        escapeCSV(b.property_title || b.plan_title),
        escapeCSV(b.status),
        escapeCSV(b.message),
        escapeCSV(b.admin_notes),
      ];
    });

    const csvContent =
      '\uFEFF' +
      [headers.map(escapeCSV).join(','), ...rows.map((row) => row.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `brickyard_bookings_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openDrawer = (booking) => {
    setSelectedBooking(booking);
    setEditingNotes(booking.admin_notes || '');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <CheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans text-ink">
      {/* Top Header Bar: Seamless borderless design */}
      <header className="bg-[#191917] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center p-1.5">
              <Image src="/logo2.1.png" alt="Brickyard" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold uppercase tracking-wider text-white">
                Brickyard Admin
              </h1>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-sans font-semibold">
                Live Management Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchLatest}
              title="Refresh Data"
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="h-5 w-px bg-white/10"></div>
            {/* Generic Administrator label - NEVER exposes any personal or official gmail */}
            <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium bg-white/5 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Administrator</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold text-white bg-[#0A5C4F] hover:bg-[#08493F] px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Switcher: Borderless modern pills */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 shadow-sm ${
              activeTab === 'bookings'
                ? 'bg-[#191917] text-white shadow-md'
                : 'bg-white text-ink-soft hover:bg-white/80'
            }`}
          >
            <UsersIcon className="w-4 h-4 text-emerald-400" />
            <span>Inquiries & True Leads</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'bookings' ? 'bg-[#0A5C4F] text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {counts.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 shadow-sm ${
              activeTab === 'analytics'
                ? 'bg-[#191917] text-white shadow-md'
                : 'bg-white text-ink-soft hover:bg-white/80'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>Website Analytics</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
              Live Tracker
            </span>
          </button>
        </div>

        {activeTab === 'analytics' ? (
          <WebsiteAnalyticsView bookings={bookings} />
        ) : (
          <>
            {/* Metric Cards Top Row: Borderless with soft shadows */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              <div
                onClick={() => setStatusFilter('all')}
                className={`p-6 rounded-3xl bg-white cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${
                  statusFilter === 'all' ? 'bg-gradient-to-br from-white to-slate-100/60 ring-2 ring-emerald-700' : 'hover:scale-[1.01]'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-ink-soft mb-1.5 font-bold">Total Inquiries</p>
                <p className="text-3xl font-serif font-bold text-ink">{counts.total}</p>
              </div>

              <div
                onClick={() => setStatusFilter('pending')}
                className={`p-6 rounded-3xl bg-white cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${
                  statusFilter === 'pending' ? 'bg-amber-50/50 ring-2 ring-amber-500' : 'hover:scale-[1.01]'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-amber-700 mb-1.5 font-bold">Pending</p>
                <p className="text-3xl font-serif font-bold text-amber-600">{counts.pending}</p>
              </div>

              <div
                onClick={() => setStatusFilter('confirmed')}
                className={`p-6 rounded-3xl bg-white cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${
                  statusFilter === 'confirmed' ? 'bg-emerald-50/50 ring-2 ring-emerald-600' : 'hover:scale-[1.01]'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-emerald-800 mb-1.5 font-bold">Confirmed</p>
                <p className="text-3xl font-serif font-bold text-emerald-700">{counts.confirmed}</p>
              </div>

              <div
                onClick={() => setStatusFilter('completed')}
                className={`p-6 rounded-3xl bg-white cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${
                  statusFilter === 'completed' ? 'bg-blue-50/50 ring-2 ring-blue-500' : 'hover:scale-[1.01]'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-blue-700 mb-1.5 font-bold">Completed</p>
                <p className="text-3xl font-serif font-bold text-blue-600">{counts.completed}</p>
              </div>

              <div
                onClick={() => setStatusFilter('cancelled')}
                className={`p-6 rounded-3xl bg-white cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${
                  statusFilter === 'cancelled' ? 'bg-red-50/50 ring-2 ring-red-500' : 'hover:scale-[1.01]'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-red-700 mb-1.5 font-bold">Cancelled</p>
                <p className="text-3xl font-serif font-bold text-red-600">{counts.cancelled}</p>
              </div>
            </div>

            {/* Filter and Search Bar: Borderless container */}
            <div className="bg-white p-5 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
              {/* Search Box */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search live inquiries by name, contact, item..."
                  className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Date & Export controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs bg-[#FAF8F5] p-2 rounded-2xl">
                  <Calendar className="w-4 h-4 text-ink-soft ml-1" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setPage(1);
                    }}
                    className="bg-transparent rounded px-1.5 py-1 text-xs focus:outline-none font-medium text-slate-700"
                  />
                  <span className="text-ink-soft">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setPage(1);
                    }}
                    className="bg-transparent rounded px-1.5 py-1 text-xs focus:outline-none font-medium text-slate-700"
                  />
                  {(startDate || endDate) && (
                    <button
                      onClick={() => {
                        setStartDate('');
                        setEndDate('');
                      }}
                      className="text-xs text-emerald-800 font-bold hover:underline px-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* CSV Export */}
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 bg-[#0A5C4F] text-white hover:bg-[#08493F] px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer ml-auto lg:ml-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table: Borderless modern container */}
            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Customer</th>
                      <th className="py-4 px-6">Contact Info</th>
                      <th className="py-4 px-6">Inquiry / Listing</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {paginatedBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-ink-soft">
                          <p className="text-sm font-semibold text-slate-700">No client inquiries found</p>
                          <p className="text-xs text-slate-400 mt-1">
                            When visitors submit rental, booking, or valuation forms on the public site, they will appear here in real time.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paginatedBookings.map((booking) => {
                        const fullName =
                          booking.full_name ||
                          `${booking.first_name || ''} ${booking.last_name || ''}`.trim() ||
                          'Visitor Inquiry';
                        const targetItem = booking.property_title || booking.plan_title || booking.inquiry_type || 'General Inquiry';

                        return (
                          <tr
                            key={booking.id}
                            className="hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer"
                            onClick={() => openDrawer(booking)}
                          >
                            <td className="py-4 px-6 text-xs text-ink-soft whitespace-nowrap">
                              {new Date(booking.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-4 px-6 font-semibold text-ink">
                              {fullName}
                            </td>
                            <td className="py-4 px-6 text-xs space-y-0.5">
                              {booking.phone && (
                                <div className="flex items-center gap-1.5 text-ink">
                                  <Phone className="w-3 h-3 text-emerald-700 shrink-0" />
                                  <span>{booking.phone}</span>
                                </div>
                              )}
                              {booking.email && (
                                <div className="flex items-center gap-1.5 text-ink-soft">
                                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{booking.email}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6 text-xs font-medium text-ink">
                              <span className="bg-[#FAF8F5] text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                                {targetItem}
                              </span>
                            </td>
                            <td
                              className="py-4 px-6 whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                className="text-xs font-bold rounded-xl bg-[#FAF8F5] py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td
                              className="py-4 px-6 text-right whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`/listings/${booking.property_id || 'prop-1'}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-ink-soft hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                                  title="Open Property Page"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                                <button
                                  onClick={() => openDrawer(booking)}
                                  className="p-2 text-ink-soft hover:text-ink hover:bg-[#FAF8F5] rounded-xl transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(booking.id)}
                                  className="p-2 text-ink-soft hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer: Borderless */}
              <div className="bg-[#FAF8F5] px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="bg-white rounded-xl px-2.5 py-1 focus:outline-none font-semibold text-slate-800 shadow-xs"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>inquiries per page (Total {filteredBookings.length})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer shadow-xs"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Booking Details Drawer: Borderless sleek overlay */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedBooking(null)}
          ></div>

          <div className="relative w-full max-w-xl bg-white min-h-full shadow-2xl z-10 flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="bg-[#191917] text-white p-7 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-sans font-bold block mb-1">
                  Inquiry Details
                </span>
                <h3 className="font-serif text-2xl font-bold">
                  {selectedBooking.full_name ||
                    `${selectedBooking.first_name || ''} ${selectedBooking.last_name || ''}`.trim() ||
                    'Client Inquiry'}
                </h3>
                <p className="text-xs text-white/50 mt-1">Ref ID: {selectedBooking.id}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-7 space-y-6 flex-grow font-sans">
              {/* Status Selector & Detail Page Action */}
              <div className="bg-[#FAF8F5] p-5 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-ink-soft font-bold">Status:</span>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                    className="text-sm font-bold rounded-xl bg-white py-1.5 px-3 focus:outline-none shadow-xs cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <a
                  href={`/listings/${selectedBooking.property_id || 'prop-1'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0A5C4F] hover:bg-[#08493F] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>View Property</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-bold">
                  Contact Details
                </h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-ink-soft block">First Name</span>
                    <span className="font-semibold text-ink">
                      {selectedBooking.first_name || (selectedBooking.full_name ? selectedBooking.full_name.trim().split(/\s+/)[0] : 'N/A')}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Last Name</span>
                    <span className="font-semibold text-ink">
                      {selectedBooking.last_name || (selectedBooking.full_name ? selectedBooking.full_name.trim().split(/\s+/).slice(1).join(' ') : '') || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Phone Number</span>
                    <span className="font-semibold text-ink">{selectedBooking.country_code ? `${selectedBooking.country_code} ` : ''}{selectedBooking.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Email Address</span>
                    <span className="font-semibold text-ink">{selectedBooking.email || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-bold">
                  Inquiry Information
                </h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-ink-soft block">Inquiry Type</span>
                    <span className="font-semibold text-emerald-800">{selectedBooking.inquiry_type || 'General'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Property / Item</span>
                    <span className="font-semibold text-ink">{selectedBooking.property_title || selectedBooking.plan_title || 'N/A'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-ink-soft block">Submission Time</span>
                    <span className="font-semibold text-ink">
                      {new Date(selectedBooking.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-ink-soft block mb-1">User Message</span>
                  <div className="p-3.5 bg-white rounded-xl text-sm text-ink whitespace-pre-wrap leading-relaxed shadow-xs">
                    {selectedBooking.message || 'No message provided.'}
                  </div>
                </div>
              </div>

              {/* Admin Notes Section */}
              <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-bold">
                  Admin Internal Notes
                </h4>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add private internal notes about this client inquiry..."
                  className="w-full bg-white rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 shadow-xs"
                ></textarea>
                <button
                  onClick={() => handleSaveNotes(selectedBooking.id)}
                  disabled={updatingNotes}
                  className="bg-[#0A5C4F] hover:bg-[#08493F] text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {updatingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-5 bg-[#FAF8F5] flex justify-between items-center">
              <button
                onClick={() => setDeleteConfirmId(selectedBooking.id)}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-red-50 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Inquiry
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-[#191917] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal: Borderless */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-xs"
            onClick={() => setDeleteConfirmId(null)}
          ></div>
          <div className="relative bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl z-10 font-sans">
            <h4 className="font-serif text-xl font-bold text-ink mb-2">Delete Inquiry?</h4>
            <p className="text-sm text-ink-soft mb-6">
              Are you sure you want to delete this inquiry record? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-soft hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white rounded-xl shadow cursor-pointer transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

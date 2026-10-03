'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
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
  MessageSquare,
  Phone,
  Mail,
  User,
  Building
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboardClient({ user, initialBookings = [] }) {
  const router = useRouter();
  const supabase = createClient();

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
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setBookings(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  // Status counts
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
      // Status filter
      if (statusFilter !== 'all' && b.status !== statusFilter) {
        return false;
      }

      // Date range filter
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

      // Search query filter
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

  // Actions
  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleSaveNotes = async (id) => {
    setUpdatingNotes(true);
    const { error } = await supabase
      .from('bookings')
      .update({ admin_notes: editingNotes })
      .eq('id', id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, admin_notes: editingNotes } : b))
      );
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => ({ ...prev, admin_notes: editingNotes }));
      }
    }
    setUpdatingNotes(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (!error) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(null);
      }
      setDeleteConfirmId(null);
    }
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
      const formattedPhone = b.phone ? `\t${b.phone}` : ''; // Prefix with tab so Excel doesn't convert to scientific notation

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

    // Add UTF-8 BOM prefix (\uFEFF) so Excel opens CSV with clean columns & encoding
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans text-ink">
      {/* Top Header Bar */}
      <header className="bg-[#191917] text-cream-light border-b border-gold-500/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo2.1.png" alt="Brickyard" width={42} height={42} className="object-contain" />
            <div>
              <h1 className="font-serif text-xl font-bold uppercase tracking-wider text-cream-light">
                Brickyard Admin
              </h1>
              <p className="text-[10px] text-gold-400 uppercase tracking-widest font-sans">
                Bookings & Inquiries Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchLatest}
              title="Refresh Data"
              className="p-2 text-cream-light/70 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="h-6 w-px bg-white/15"></div>
            <span className="text-xs text-cream-light/70 hidden md:inline">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-medium text-cream-light bg-gold-600 hover:bg-gold-500 px-3.5 py-2 rounded transition-colors cursor-pointer shadow"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Cards Top Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div
            onClick={() => setStatusFilter('all')}
            className={`p-5 rounded-xl bg-white border cursor-pointer transition-all shadow-sm ${statusFilter === 'all' ? 'border-gold-500 ring-2 ring-gold-400/20' : 'border-cream-dark hover:border-gold-300'}`}
          >
            <p className="text-xs uppercase tracking-wider text-ink-soft mb-1 font-semibold">Total Inquiries</p>
            <p className="text-3xl font-serif font-bold text-ink">{counts.total}</p>
          </div>

          <div
            onClick={() => setStatusFilter('pending')}
            className={`p-5 rounded-xl bg-white border cursor-pointer transition-all shadow-sm ${statusFilter === 'pending' ? 'border-amber-500 ring-2 ring-amber-400/20' : 'border-cream-dark hover:border-amber-300'}`}
          >
            <p className="text-xs uppercase tracking-wider text-amber-700 mb-1 font-semibold">Pending</p>
            <p className="text-3xl font-serif font-bold text-amber-600">{counts.pending}</p>
          </div>

          <div
            onClick={() => setStatusFilter('confirmed')}
            className={`p-5 rounded-xl bg-white border cursor-pointer transition-all shadow-sm ${statusFilter === 'confirmed' ? 'border-emerald-500 ring-2 ring-emerald-400/20' : 'border-cream-dark hover:border-emerald-300'}`}
          >
            <p className="text-xs uppercase tracking-wider text-emerald-700 mb-1 font-semibold">Confirmed</p>
            <p className="text-3xl font-serif font-bold text-emerald-600">{counts.confirmed}</p>
          </div>

          <div
            onClick={() => setStatusFilter('completed')}
            className={`p-5 rounded-xl bg-white border cursor-pointer transition-all shadow-sm ${statusFilter === 'completed' ? 'border-blue-500 ring-2 ring-blue-400/20' : 'border-cream-dark hover:border-blue-300'}`}
          >
            <p className="text-xs uppercase tracking-wider text-blue-700 mb-1 font-semibold">Completed</p>
            <p className="text-3xl font-serif font-bold text-blue-600">{counts.completed}</p>
          </div>

          <div
            onClick={() => setStatusFilter('cancelled')}
            className={`p-5 rounded-xl bg-white border cursor-pointer transition-all shadow-sm ${statusFilter === 'cancelled' ? 'border-red-500 ring-2 ring-red-400/20' : 'border-cream-dark hover:border-red-300'}`}
          >
            <p className="text-xs uppercase tracking-wider text-red-700 mb-1 font-semibold">Cancelled</p>
            <p className="text-3xl font-serif font-bold text-red-600">{counts.cancelled}</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-5 rounded-xl border border-cream-dark shadow-sm mb-6 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, phone, item..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-cream-dark rounded-lg text-sm focus:outline-none focus:border-gold-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Date & Filter controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4 text-ink-soft" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="bg-[#FAF8F5] border border-cream-dark rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-gold-400"
              />
              <span className="text-ink-soft">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="bg-[#FAF8F5] border border-cream-dark rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-gold-400"
              />
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="text-xs text-gold-600 hover:underline"
                >
                  Clear dates
                </button>
              )}
            </div>

            <div className="h-6 w-px bg-cream-dark hidden sm:block"></div>

            {/* CSV Export */}
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-ink text-white hover:bg-ink-soft px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow cursor-pointer ml-auto lg:ml-0"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl border border-cream-dark shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-cream-dark text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Customer Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Inquiry / Item</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark text-sm">
                {paginatedBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-ink-soft">
                      No bookings found matching criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedBookings.map((booking) => {
                    const fullName =
                      booking.full_name ||
                      `${booking.first_name || ''} ${booking.last_name || ''}`.trim() ||
                      'Anonymous User';
                    const targetItem = booking.property_title || booking.plan_title || booking.inquiry_type || 'General Inquiry';

                    return (
                      <tr
                        key={booking.id}
                        className="hover:bg-[#FCFAF5] transition-colors cursor-pointer"
                        onClick={() => openDrawer(booking)}
                      >
                        <td className="py-4 px-4 text-xs text-ink-soft whitespace-nowrap">
                          {new Date(booking.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-4 px-4 font-semibold text-ink">
                          {fullName}
                        </td>
                        <td className="py-4 px-4 text-xs space-y-0.5">
                          {booking.phone && (
                            <div className="flex items-center gap-1.5 text-ink">
                              <Phone className="w-3 h-3 text-gold-500 shrink-0" />
                              <span>{booking.phone}</span>
                            </div>
                          )}
                          {booking.email && (
                            <div className="flex items-center gap-1.5 text-ink-soft">
                              <Mail className="w-3 h-3 text-gold-500 shrink-0" />
                              <span>{booking.email}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-ink">
                          <span className="bg-gold-50 text-gold-800 border border-gold-200 px-2 py-0.5 rounded">
                            {targetItem}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            className="text-xs font-semibold rounded-md border border-cream-dark bg-white py-1 px-2 focus:outline-none focus:border-gold-400 cursor-pointer shadow-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td
                          className="py-4 px-4 text-right whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openDrawer(booking)}
                              className="p-1.5 text-ink-soft hover:text-gold-600 hover:bg-gold-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(booking.id)}
                              className="p-1.5 text-ink-soft hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete Booking"
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

          {/* Pagination Footer */}
          <div className="bg-[#FAF8F5] border-t border-cream-dark px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-white border border-cream-dark rounded px-2 py-1 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries per page (Total {filteredBookings.length})</span>
            </div>

            <div className="flex items-center gap-2">
              <span>
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-1">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 border border-cream-dark rounded bg-white hover:bg-cream disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 border border-cream-dark rounded bg-white hover:bg-cream disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Details Drawer / Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedBooking(null)}
          ></div>

          <div className="relative w-full max-w-xl bg-white min-h-full shadow-2xl z-10 flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="bg-[#191917] text-cream-light p-6 border-b border-gold-500/20 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-sans block mb-1">
                  Booking Details
                </span>
                <h3 className="font-serif text-2xl font-bold">
                  {selectedBooking.full_name ||
                    `${selectedBooking.first_name || ''} ${selectedBooking.last_name || ''}`.trim() ||
                    'Anonymous Visitor'}
                </h3>
                <p className="text-xs text-cream-light/60 mt-1">ID: {selectedBooking.id}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-cream-light/70 hover:text-white rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6 flex-grow font-sans">
              {/* Status Selector */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-cream-dark flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-ink-soft font-bold">Status</span>
                <select
                  value={selectedBooking.status}
                  onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                  className="text-sm font-semibold rounded-md border border-gold-300 bg-white py-1.5 px-3 focus:outline-none focus:border-gold-500 shadow-xs"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-bold border-b border-cream-dark pb-2">
                  Contact Details
                </h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-ink-soft block">First Name</span>
                    <span className="font-medium text-ink">
                      {selectedBooking.first_name || (selectedBooking.full_name ? selectedBooking.full_name.trim().split(/\s+/)[0] : 'N/A')}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Last Name</span>
                    <span className="font-medium text-ink">
                      {selectedBooking.last_name || (selectedBooking.full_name ? selectedBooking.full_name.trim().split(/\s+/).slice(1).join(' ') : '') || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Phone Number</span>
                    <span className="font-medium text-ink">{selectedBooking.country_code ? `${selectedBooking.country_code} ` : ''}{selectedBooking.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Email Address</span>
                    <span className="font-medium text-ink">{selectedBooking.email || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Details */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-bold border-b border-cream-dark pb-2">
                  Inquiry Information
                </h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-ink-soft block">Inquiry Type</span>
                    <span className="font-medium text-gold-700">{selectedBooking.inquiry_type || 'General'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-ink-soft block">Property / Item</span>
                    <span className="font-medium text-ink">{selectedBooking.property_title || selectedBooking.plan_title || 'N/A'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-ink-soft block">Submission Time</span>
                    <span className="font-medium text-ink">
                      {new Date(selectedBooking.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-ink-soft block mb-1">User Message</span>
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-cream-dark text-sm text-ink whitespace-pre-wrap leading-relaxed">
                    {selectedBooking.message || 'No message provided.'}
                  </div>
                </div>
              </div>

              {/* Admin Notes Section */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-bold border-b border-cream-dark pb-2">
                  Admin Internal Notes
                </h4>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add internal notes about this booking..."
                  className="w-full bg-[#FAF8F5] border border-cream-dark rounded-lg p-3 text-sm focus:outline-none focus:border-gold-400"
                ></textarea>
                <button
                  onClick={() => handleSaveNotes(selectedBooking.id)}
                  disabled={updatingNotes}
                  className="bg-gold-gradient text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded shadow hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {updatingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-cream-dark flex justify-between items-center">
              <button
                onClick={() => setDeleteConfirmId(selectedBooking.id)}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 px-3 py-2 rounded hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Delete Inquiry
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-ink text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-ink-soft"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-xs"
            onClick={() => setDeleteConfirmId(null)}
          ></div>
          <div className="relative bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl border border-cream-dark z-10 font-sans">
            <h4 className="font-serif text-xl font-bold text-ink mb-2">Delete Booking?</h4>
            <p className="text-sm text-ink-soft mb-6">
              Are you sure you want to delete this booking inquiry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-soft hover:bg-cream rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white rounded shadow"
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

/**
 * Brickyard Portal Design Tokens
 * Spec: Primary deep teal-green #0A5C4F, Accent warm amber #FF6B35,
 * Radii 12px cards, 8px inputs, 999px pills.
 */

export const tokens = {
  colors: {
    primary: '#0A5C4F',
    primaryHover: '#08493F',
    primarySurface: '#E6F2F0',
    primaryBorder: '#B3D6D0',

    accent: '#FF6B35',
    accentHover: '#E85522',
    accentSurface: '#FFF1EC',
    accentBorder: '#FFD5C5',

    surface: '#FFFFFF',
    surfaceSubtle: '#F8FAFC',
    surfaceMuted: '#F1F5F9',

    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    borderFocus: '#0A5C4F',

    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    textInverse: '#FFFFFF',

    verified: '#0A5C4F',
    verifiedSurface: '#E6F2F0',
    premium: '#FF6B35',
    premiumSurface: '#FFF1EC',
  },
  radii: {
    card: '12px',
    input: '8px',
    pill: '999px',
  },
  shadows: {
    card: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
    cardHover: '0 4px 12px 0 rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
  },
};

/**
 * Format currency strictly according to Bayut / UAE standards:
 * E.g.: "AED 1,450,000" or "AED 85,000/year"
 */
export function formatAED(value, period = null) {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return 'AED —';
  }
  const numeric = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]+/g, ''));
  const formatted = new Intl.NumberFormat('en-AE', {
    maximumFractionDigits: 0,
  }).format(numeric);

  if (period) {
    const cleanPeriod = period.startsWith('/') ? period : `/${period}`;
    return `AED ${formatted}${cleanPeriod}`;
  }
  return `AED ${formatted}`;
}

export function formatNumber(val) {
  if (!val && val !== 0) return '0';
  return new Intl.NumberFormat('en-AE').format(Number(val));
}

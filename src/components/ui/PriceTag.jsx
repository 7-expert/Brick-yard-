import React from 'react';
import { formatAED } from '@/lib/tokens';

export default function PriceTag({ price, period = null, size = 'default', isAccent = true, className = '' }) {
  const sizeClasses = {
    sm: 'text-sm font-bold',
    default: 'text-lg sm:text-xl font-bold tracking-tight',
    lg: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
    hero: 'text-3xl sm:text-4xl font-extrabold tracking-tight',
  };

  const formatted = formatAED(price, period);

  return (
    <span
      className={`inline-block font-sans ${isAccent ? 'text-[#FF6B35]' : 'text-slate-900'} ${
        sizeClasses[size] || sizeClasses.default
      } ${className}`}
    >
      {formatted}
    </span>
  );
}

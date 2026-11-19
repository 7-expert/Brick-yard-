'use client';

import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, Calendar } from 'lucide-react';
import { formatAED } from '@/lib/tokens';

export default function MortgageCalculator({ defaultPrice = 2450000 }) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPaymentAmount;

  // Monthly mortgage calculation formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = tenureYears * 12;

  let monthlyPayment = 0;
  if (loanAmount > 0 && monthlyInterestRate > 0) {
    monthlyPayment =
      (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#E6F2F0] text-[#0A5C4F] flex items-center justify-center">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-semibold text-base text-slate-900 tracking-tight">
            Mortgage Estimator
          </h3>
          <p className="text-xs text-slate-500">Estimated monthly payment in AED</p>
        </div>
      </div>

      {/* Result Display Box */}
      <div className="bg-[#E6F2F0] rounded-xl p-4 mb-6 border border-[#B3D6D0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0A5C4F] block">
            Estimated Monthly Payment
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0A5C4F]">
            {formatAED(Math.round(monthlyPayment))}<span className="text-sm font-normal text-slate-600"> / month</span>
          </div>
        </div>
        <div className="text-xs text-slate-600 text-left sm:text-right">
          <div>Loan: {formatAED(Math.round(loanAmount))}</div>
          <div>Down Payment: {formatAED(Math.round(downPaymentAmount))}</div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="space-y-4 text-xs">
        {/* Property Price */}
        <div>
          <div className="flex justify-between font-medium text-slate-700 mb-1">
            <span>Property Price</span>
            <span className="font-bold text-slate-900">{formatAED(price)}</span>
          </div>
          <input
            type="range"
            min={500000}
            max={20000000}
            step={50000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#0A5C4F] cursor-pointer"
          />
        </div>

        {/* Down Payment % */}
        <div>
          <div className="flex justify-between font-medium text-slate-700 mb-1">
            <span>Down Payment ({downPaymentPercent}%)</span>
            <span className="font-bold text-slate-900">{formatAED(downPaymentAmount)}</span>
          </div>
          <input
            type="range"
            min={15}
            max={50}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-[#0A5C4F] cursor-pointer"
          />
        </div>

        {/* Tenure Years */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-slate-600 mb-1 font-medium">Loan Period (Years)</label>
            <select
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:border-[#0A5C4F] outline-none"
            >
              <option value={10}>10 Years</option>
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={25}>25 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">Interest Rate (%)</label>
            <input
              type="number"
              step="0.05"
              min="1"
              max="15"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:border-[#0A5C4F] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


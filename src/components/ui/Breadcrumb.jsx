import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  const schemaList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: '/',
    },
    ...items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: item.label,
      item: item.href || '',
    })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: schemaList,
          }),
        }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 py-3 overflow-x-auto scrollbar-none">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-[#0A5C4F] transition-colors shrink-0">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={idx} className="flex items-center shrink-0">
              <ChevronRight className="w-3 h-3 mx-1.5 text-slate-400" />
              {isLast || !item.href ? (
                <span className="font-medium text-slate-800 truncate max-w-[200px] sm:max-w-[320px]">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[#0A5C4F] transition-colors">
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}


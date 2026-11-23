"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>

      {isAdmin ? (
        <main suppressHydrationWarning className="flex-grow">{children}</main>
      ) : (
        <>
          <Navigation />
          <main suppressHydrationWarning className="flex-grow">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}

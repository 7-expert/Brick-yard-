import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Brickyard | Dubai Property Portal - Apartments, Villas & Off-Plan for Sale & Rent",
    template: "%s | Brickyard Real Estate Dubai",
  },
  description: "Search 15,000+ verified properties for sale and rent in Dubai, UAE. Find apartments, luxury villas, and off-plan projects with Brickyard verified agents.",
  keywords: ["Dubai real estate", "apartments for rent in Dubai", "properties for sale Dubai", "off plan projects Dubai", "Brickyard"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}

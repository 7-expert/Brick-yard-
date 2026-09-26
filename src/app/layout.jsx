import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const waldenburg = localFont({
  src: "./fonts/Waldenburg.woff2",
  variable: "--font-waldenburg",
  weight: "500",
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brickyard Real Estate",
  description: "Find Your Next Address",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${waldenburg.variable} ${playfair.variable} antialiased font-sans min-h-screen flex flex-col`}>
        <SmoothScroll>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

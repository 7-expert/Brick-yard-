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
  description: "Search 15,000+ verified properties for sale and rent in Dubai, UAE. Find apartments, luxury villas, and off-plan projects with TruBroker™ verified agents.",
  keywords: ["Dubai real estate", "apartments for rent in Dubai", "properties for sale Dubai", "off plan projects Dubai", "Brickyard"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var clean = function(el) {
                    if (el && el.removeAttribute) {
                      el.removeAttribute('bis_skin_checked');
                      el.removeAttribute('bis_register');
                    }
                  };
                  var obs = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes') {
                        clean(m.target);
                      } else if (m.type === 'childList') {
                        for (var j = 0; j < m.addedNodes.length; j++) {
                          var node = m.addedNodes[j];
                          if (node.nodeType === 1) {
                            clean(node);
                            if (node.querySelectorAll) {
                              var items = node.querySelectorAll('[bis_skin_checked], [bis_register]');
                              for (var k = 0; k < items.length; k++) clean(items[k]);
                            }
                          }
                        }
                      }
                    }
                  });
                  obs.observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    childList: true,
                    attributeFilter: ['bis_skin_checked', 'bis_register']
                  });
                  window.addEventListener('DOMContentLoaded', function() {
                    var els = document.querySelectorAll('[bis_skin_checked], [bis_register]');
                    for (var i = 0; i < els.length; i++) clean(els[i]);
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}

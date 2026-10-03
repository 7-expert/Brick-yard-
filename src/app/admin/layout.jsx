export const metadata = {
  title: "Admin Panel | Brickyard Real Estate",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {children}
    </div>
  );
}

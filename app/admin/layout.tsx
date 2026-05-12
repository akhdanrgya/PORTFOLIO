import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen grid-bg relative" style={{ background: "#0a0a0f" }}>
      <Sidebar />
      <main className="flex-1 overflow-auto w-full">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12 mt-16 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

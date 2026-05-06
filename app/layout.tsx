import type { Metadata } from "next";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Akhdan Anargya Arisadi — Fullstack Developer & Founder of GokilTech",
  description:
    "Portfolio of Akhdan Anargya Arisadi — Software Engineer, Fullstack Developer, Information Systems Student at Telkom University, and Founder of GokilTech.",
  keywords: ["Akhdan Anargya", "Fullstack Developer", "Software Engineer", "GokilTech", "Telkom University"],
  authors: [{ name: "Akhdan Anargya Arisadi" }],
  openGraph: {
    title: "Akhdan Anargya Arisadi — Fullstack Developer",
    description: "Portfolio of Akhdan — Software Engineer & Founder of GokilTech",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#0a0a0f] text-slate-100 antialiased" suppressHydrationWarning>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}

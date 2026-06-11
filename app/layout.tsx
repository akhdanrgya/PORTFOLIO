import type { Metadata } from "next";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "Akhdan Anargya Arisadi — Software Engineer & Founder of GokilTech",
  description:
    "Portfolio of Akhdan Anargya Arisadi — Software Engineer, Fullstack Developer, Information Systems Student at Telkom University, and Founder of GokilTech.",
  keywords: ["Akhdan Anargya", "Fullstack Developer", "Software Engineer", "GokilTech", "Telkom University"],
  authors: [{ name: "Akhdan Anargya Arisadi" }],
  openGraph: {
    title: "Akhdan Anargya Arisadi — Software Engineer",
    description: "Portfolio of Akhdan — Software Engineer & Founder of GokilTech",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#0F1115] text-[#e2e2e8] antialiased" suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <ToastContainer />
        </LanguageProvider>
      </body>
    </html>
  );
}

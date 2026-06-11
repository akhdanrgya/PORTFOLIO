import { supabaseServer } from "@/lib/supabaseServer";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import AboutClient from "@/components/portfolio/pages/AboutClient";
import type { About } from "@/lib/supabase";

export const revalidate = 60;

export default async function AboutPage() {
  const { data } = await supabaseServer
    .from("about")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  const about = (data as About) ?? null;

  return (
    <>
      <Navbar />
      <AboutClient about={about} />
      <Footer />
    </>
  );
}

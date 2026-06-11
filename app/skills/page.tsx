import { supabaseServer } from "@/lib/supabaseServer";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import SkillsClient from "@/components/portfolio/pages/SkillsClient";
import type { Skill } from "@/lib/supabase";

export const revalidate = 60;

export default async function SkillsPage() {
  const { data } = await supabaseServer
    .from("skills")
    .select("*")
    .order("order_index");

  const skills = (data as Skill[]) ?? [];

  return (
    <>
      <Navbar />
      <SkillsClient skills={skills} />
      <Footer />
    </>
  );
}

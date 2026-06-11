import { supabaseServer } from "@/lib/supabaseServer";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ProjectsClient from "@/components/portfolio/pages/ProjectsClient";
import type { Project } from "@/lib/supabase";

export const revalidate = 60;

export default async function ProjectsPage() {
  const { data } = await supabaseServer
    .from("projects")
    .select("*")
    .order("order_index")
    .order("created_at", { ascending: false });

  const projects = (data as Project[]) ?? [];
  
  return (
    <>
      <Navbar />
      <ProjectsClient projects={projects} />
      <Footer />
    </>
  );
}

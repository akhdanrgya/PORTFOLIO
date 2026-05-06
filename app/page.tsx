import { supabaseServer } from "@/lib/supabaseServer";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import AboutSection from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import ExperienceSection from "@/components/portfolio/Experience";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import type { About, Skill, Project, Experience, Certification } from "@/lib/supabase";

async function getData() {
  const [aboutRes, skillsRes, projectsRes, expRes, certRes] = await Promise.all([
    supabaseServer.from("about").select("*").order("updated_at", { ascending: false }).limit(1).single(),
    supabaseServer.from("skills").select("*").order("order_index"),
    supabaseServer.from("projects").select("*").order("order_index").order("created_at", { ascending: false }),
    supabaseServer.from("experience").select("*").order("order_index").order("start_date", { ascending: false }),
    supabaseServer.from("certifications").select("*").order("order_index").order("issue_date", { ascending: false }),
  ]);

  return {
    about: (aboutRes.data as About) ?? null,
    skills: (skillsRes.data as Skill[]) ?? [],
    projects: (projectsRes.data as Project[]) ?? [],
    experiences: (expRes.data as Experience[]) ?? [],
    certifications: (certRes.data as Certification[]) ?? [],
  };
}

export const revalidate = 60; // ISR: revalidate every 60s

export default async function HomePage() {
  const { about, skills, projects, experiences, certifications } = await getData();

  return (
    <main>
      <Navbar />
      <Hero about={about} />
      <AboutSection about={about} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <Certifications certifications={certifications} />
      <Contact />
    </main>
  );
}

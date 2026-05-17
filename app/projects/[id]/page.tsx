import { supabaseServer } from "@/lib/supabaseServer";
import type { Project } from "@/lib/supabase";
import type { Metadata } from "next";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
import Navbar from "@/components/portfolio/Navbar";

type Props = {
  params: Promise<{ id: string }>;
};

async function getProject(id: string): Promise<Project | null> {
  const { data } = await supabaseServer
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  return data as Project | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Akhdan Anargya`,
    description: project.description || `${project.title} project by Akhdan Anargya Arisadi`,
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.thumbnail_url ? [project.thumbnail_url] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  return (
    <>
      <Navbar />
      <ProjectDetail project={project} />
    </>
  );
}

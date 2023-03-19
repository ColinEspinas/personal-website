import supabase from "src/scripts/supabase";
import type Project from "src/types/project";
import type Tag from "src/types/tag";

export const getProjectTags = async (id: number): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from("project-tags")
    .select("*")
    .eq("project", id);

  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .select("*")
    .in(
      "id",
      data.map((tag) => tag.tag)
    );
  return tagsData as Tag[];
};

export const getProjectsByCategory = async (category: string, count: number) => {
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("label", category)
    .single();
  if (categoryError) {
    throw categoryError;
  }

  const { data: projectsData, error: projectError } = await supabase
    .from("projects")
    .select("id, name, description, link")
    .eq("category", categoryData.id)
    .order("date", { ascending: false })
    .limit(count)
  if (projectError) {
    throw projectError;
  }

  return Promise.all(
    projectsData.map(async (project: Project) => {
      project.tags = await getProjectTags(project.id);
      return project;
    }) as Promise<Project>[]
  );
}

export const getLatestProjects = async (count: number) => {
  const { data: projectsData, error: projectError } = await supabase
    .from("projects")
    .select("id, name, description, link")
    .order("date", { ascending: false })
    .limit(count);
  if (projectError) {
    throw projectError;
  }

  return Promise.all(
    projectsData.map(async (project: Project) => {
      project.tags = await getProjectTags(project.id);
      return project;
    }) as Promise<Project>[]
  );
}
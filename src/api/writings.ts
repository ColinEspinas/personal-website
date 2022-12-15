import supabase from "src/scripts/supabase";
import type Tag from "src/types/tag";

export const getWritingTags = async (id: number): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from("writing-tags")
    .select("*")
    .eq("writing", id);

  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .select("*")
    .in(
      "id",
      data.map((tag) => tag.tag)
    );
  return tagsData as Tag[];
};
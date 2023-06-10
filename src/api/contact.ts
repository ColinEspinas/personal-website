import supabase from "src/scripts/supabase";

export const sendContactMessage = async (name, email, message) => {
  return await supabase
  .from("contact-messages")
  .insert([
    { email, name, message },
  ]);
}
import type Tag from "./tag";

export default interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  tags?: Tag[]
}
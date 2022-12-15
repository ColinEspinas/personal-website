import type Tag from "./tag";

export default interface Writing {
  id: number;
  title: string;
  description: string;
  link: string;
  tags?: Tag[]
}
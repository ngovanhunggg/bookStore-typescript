import { Theme } from "./Theme";

interface Book {
    id?:number
    title?:string;
    author?:string;
    topic?:number;
}
type Books = Book[]

export interface StoredData extends Theme{
  books?: Book[];
  currentPage?: number;
}

interface ITopic {
  0:string
  1:string
  2:string
}

export type {Theme,Book,Books,ITopic}

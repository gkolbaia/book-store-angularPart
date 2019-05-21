import { Author } from './author';

export interface Book {
  name: string,
  author: Author,
  category: string[],
  price: number,
  sale: number,
  description: string,
  publishDate?: Date,
  image?: File,
  posterToGet?: string
}

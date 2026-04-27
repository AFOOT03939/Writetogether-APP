export interface Story {
  storyId: number;
  title?: string;
  description?: string;
  status?: string;
  visibility?: string;
  imageUrl?: string;
  createdAt?: string;
  category?: string;
  categoryIds: number[];
  authorName?: string;
  rating?: number;
}
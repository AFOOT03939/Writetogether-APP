export interface Story {
  storyId: number;
  title?: string;
  description?: string;
  status?: string;
  visibility?: string;
  imageUrl?: string;
  createdAt?: string;

  authorName?: string;
  rating?: number;
}
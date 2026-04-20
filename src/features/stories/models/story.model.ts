export interface StoriesModel {
  storyId: number;
  title?: string;
  description?: string;
  userId: number;
  status?: string;
  visibility?: string;
  imageUrl?: string;
  createdAt?: string; 
  authorName?: string;
  rating: number;
  category?: string;
  categoryIds: number[];
  tags: string[];
}

export interface StoriesModelRequest {
  title?: string;
  description?: string;
  userId: number;
  status?: string;
  visibility?: string;
  imageUrl?: string;
  createdAt?: string; 
  authorName?: string;
  categoryIds: number[];
}

export interface StoriesCollaboratorsModel {
  storyId: number;
  userId: number;
  createdAt: string; 
  userName: string;
}


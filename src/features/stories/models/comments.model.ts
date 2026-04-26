export interface Comment {
  messageId: number;
  message?: string;
  userId: number;
  userName: string;
  createdAt: string;
  imageUrl?: string;
}
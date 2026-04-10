export interface User {
  userId: number;
  username: string | null;
  email: string | null;
  reputationPoints: number;
  rol: string | null;
  imageUrl: string | null;
}
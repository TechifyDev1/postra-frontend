// Global type definitions for frontend

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

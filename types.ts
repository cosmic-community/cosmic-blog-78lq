// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at?: string;
}

// Blog Post
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    content?: string;
    author?: Author;
    excerpt?: string;
    published_date?: string;
    category?: Category;
    published_at?: string;
  };
}

// Author
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    email?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Helper type guard
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}
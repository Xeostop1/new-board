// types/Post.ts

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  author: {
    name: string | null;
  };
};

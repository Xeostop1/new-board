// types/Comment.ts
export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
  };
};

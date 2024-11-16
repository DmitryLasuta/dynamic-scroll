import { z } from "zod";

export const PostSchema = z.object({
  /**
   * The user ID of the user who created the post.
   */
  "userId": z.number(),
  /**
   * The ID of the post.
   */
  "id": z.number(),
  /**
   * The title of the post.
   */
  "title": z.string(),
  /**
   * The body of the post.
   */
  "body": z.string(),
});

/**
 * The schema for an array of posts.
 */
export const PostsSchema = z.array(PostSchema);

/**
 * The type definition for a post.
 */
export type Post = z.infer<typeof PostSchema>;

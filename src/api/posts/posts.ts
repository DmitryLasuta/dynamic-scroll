import { API, type Meta } from '@/api';
import { Post, PostSchema, PostsSchema } from './schema';
import { PostPostListParams } from './types';

/**
 * Class representing the Posts API.
 *
 * Includes methods for fetching posts and post details.
 */
class PostsApi extends API {
  private endpoints = {
    /**
     * The default endpoint for fetching posts.
     */
    default: '/posts',
    /**
     * The endpoint for fetching post details by ID.
     */
    details: (id: number) => `/posts/${id}`,
  };

  private MAX_POSTS_PER_PAGE = 10;

  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  /**
   * Fetches a list of posts.
   *
   * @returns A promise that resolves to an array of Post objects.
   */
  public getPosts(
    { page, limit = this.MAX_POSTS_PER_PAGE }: PostPostListParams,
    { signal }: Meta
  ): Promise<Post[]> {
    return this.fetcher({
      endpoint: `${this.endpoints.default}?_page=${page}&_limit=${limit}`,
      schema: PostsSchema,
      schemaName: 'PostsSchema',
      options: {
        signal,
      },
    });
  }

  /**
   * Fetches details for a specific post by its ID.
   *
   * @param id The ID of the post to fetch details for.
   * @returns A promise that resolves to a Post object.
   */
  public async getPostDetails(id: number, { signal }: Meta): Promise<Post> {
    return this.fetcher({
      endpoint: this.endpoints.details(id),
      schema: PostSchema,
      schemaName: 'PostSchema',
      options: {
        signal: signal,
      },
    });
  }
}

/**
 * The instance of the PostsApi class.
 */
export const postsApi = new PostsApi();

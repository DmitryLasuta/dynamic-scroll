import { API } from '@/api';
import { Post, PostSchema, PostsSchema } from './schema';

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

  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  /**
   * Fetches a list of posts.
   *
   * @param signal An AbortSignal used to cancel the request.
   * @returns A promise that resolves to an array of Post objects.
   */
  public getPosts({ signal }: { signal: AbortSignal }): Promise<Post[]> {
    return this.fetcher({
      endpoint: this.endpoints.default,
      schema: PostsSchema,
      schemaName: 'PostsSchema',
      options: {
        signal,
      },
    });
  }

  /**
   * Fetches details for a specific post by its ID.
   * @param id The ID of the post to fetch details for.
   * @param signal An AbortSignal used to cancel the request.
   * @returns A promise that resolves to a Post object.
   */
  public async getPostDetails(id: number, { signal }: { signal: AbortSignal }): Promise<Post> {
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

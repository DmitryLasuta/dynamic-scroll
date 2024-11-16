import { API } from '@/api';
import { Post, PostSchema, PostsSchema } from './schema';

class PostsApi extends API {
  private endpoints = {
    default: '/posts',
    details: (id: number) => `/posts/${id}`,
  };

  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  public async getPosts(): Promise<Post[]> {
    return this.fetcher({
      endpoint: this.endpoints.default,
      schema: PostsSchema,
      schemaName: 'PostsSchema',
    });
  }

  public async getPost(id: number): Promise<Post> {
    return this.fetcher({
      endpoint: this.endpoints.details(id),
      schema: PostSchema,
      schemaName: 'PostSchema',
    });
  }
}

export const postsApi = new PostsApi();

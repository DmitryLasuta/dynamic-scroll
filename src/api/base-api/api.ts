import { z } from 'zod';
import { validateSchema } from './validator';
import { FetcherParams, ValidateConfig } from './types';

/**
 * Abstract base class for interacting with APIs.
 * Includes methods for response validation, base URL management, and HTTP requests.
 */
export abstract class API {
  private BASE_URL: string;

  /**
   * Accessor for the base URL of the API.
   */
  protected get baseUrl() {
    return this.BASE_URL;
  }

  /**
   * Creates an instance of the API class.
   *
   * @param baseUrl - The base URL for API requests.
   */
  constructor(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  /**
   * Executes an HTTP request, parses the JSON response, and validates it using the provided schema.
   *
   * @returns The parsed and validated response data.
   * @throws {Error} If the request fails, the response is invalid, or the data does not match the schema.
   *
   * @example
   * const userSchema = z.object({ id: z.number(), name: z.string() });
   * const data = await apiInstance.fetcher({
   *   endpoint: "/users",
   *   options: { method: "GET" },
   *   schema: userSchema,
   *   schemaName: "UserSchema"
   * });
   */
  protected async fetcher<T extends z.ZodTypeAny>({ endpoint, options = {}, schema, schemaName }: FetcherParams<T>): Promise<z.infer<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      console.error(`[API] Request failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    try {
      const data = await response.json();

      // Validate response using the schema
      return this.validateResponse({ dataTransferObject: data, schema, schemaName });
    } catch (error) {
      console.error(`[API] Failed to parse or validate response: ${error}`);
      throw new Error('Failed to parse or validate response.');
    }
  }

  /**
   * Validates an API response against a provided Zod schema.
   *
   * @returns The validated data if it conforms to the schema.
   * @throws {z.ZodError} If the response data does not match the schema.
   */
  private validateResponse<T extends z.ZodTypeAny>(options: ValidateConfig<T>): z.infer<T> {
    return validateSchema(options);
  }
}

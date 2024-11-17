import { z } from 'zod';

/**
 * Configuration object for schema validation.
 *
 * @template T Type of the Zod schema.
 */
export interface ValidateConfig<T extends z.ZodTypeAny> {
  /**
   * The data to be validated.
   */
  dataTransferObject: unknown;

  /**
   * The Zod schema defining the expected data structure.
   */
  schema: T;

  /**
   * The name of the schema, used for logging and error tracking.
   */
  schemaName: string;
}

/**
 * Interface defining the parameters for the fetcher method.
 */
export interface FetcherParams<T extends z.ZodTypeAny> {
  /**
   * The API endpoint to request, relative to the base URL.
   */
  endpoint: string;
  /**
   * **(Optional)**: Additional fetch options, such as method, headers, and body.
   */
  options?: RequestInit;
  /**
   * The Zod schema to validate the response against.
   */
  schema: T;
  /**
   * The name of the schema, used for error tracking and logging.
   */
  schemaName: string;
}

export type Meta = {
  /**
   * An AbortSignal used to cancel the request.
   */
  signal: AbortSignal;
};

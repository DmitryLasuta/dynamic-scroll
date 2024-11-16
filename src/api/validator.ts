import { z } from "zod";

/**
 * Configuration object for schema validation.
 *
 * @template T Type of the Zod schema.
 */
interface ValidateConfig<T extends z.ZodTypeAny> {
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
 * Validates data against a Zod schema.
 *
 * @template T Type of the Zod schema.
 * @param config - The configuration object that includes:
 *   - `dataTransferObject`: The data to validate.
 *   - `schema`: The Zod schema used to validate the data.
 *   - `schemaName`: A name for the schema, useful for logging.
 * @returns The validated data that conforms to the schema.
 * @throws {z.ZodError} Throws an error if the data does not conform to the schema.
 * 
 * @example
 * const schema = z.object({ id: z.number(), name: z.string() });
 * const config = {
 *   dataTransferObject: { id: 1, name: "John" },
 *   schema: schema,
 *   schemaName: "UserSchema",
 * };
 * const validData = validateSchema(config);
 */
export function validateSchema<T extends z.ZodTypeAny>(
  config: ValidateConfig<T>
): z.infer<T> {
  const { data: fetchedData, success: isDataValid, error: validationError } = config.schema.safeParse(config.dataTransferObject);

  if (isDataValid) {
    return fetchedData;
  } else {
    captureError(`API Validation Error: ${config.schemaName}`, {
      dataTransferObject: config.dataTransferObject, // The original data passed for validation.
      error: validationError.message, // The main error message from Zod.
      issues: validationError.issues, // Detailed validation errors.
    });

    throw validationError; // Re-throw the error for upstream handling.
  }
}

/**
 * Logs validation errors to the console in development mode.
 * 
 * @param message - A string describing the error.
 * @param extra - An optional object containing additional information about the error.
 *   - `dto`: The original data that failed validation.
 *   - `error`: The error message string.
 *   - `issues`: An array of validation issues provided by Zod.
 */
function captureError(message: string, extra: Record<string, unknown> = {}): void {
  if (import.meta.env.MODE === 'development') {
    console.error(message, extra);
  }
}

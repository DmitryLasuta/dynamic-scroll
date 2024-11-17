import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Type definition for query options, except for `queryKey` and `queryFn` properties.
 * Used in `useQuery` hook for defining query options.
 */
export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
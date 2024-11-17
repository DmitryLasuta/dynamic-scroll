# Infinity Scroll with response validation

A small project that implements the functionality of content loading by scroll and validation of the response from the slicer

## Technologies Used 🛠️

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7)

## Key features 🔑

- Infinite scrolling using the custom `useIntersection` hook.
- Data validation using the `Zod` library.
- Error handling via `ErrorBoundary` component.
- Universal API class for working with requests.

## Description 👾

`PostsList` is the main React component of the project, implementing infinite scrolling to display a list of posts using the **Intersection Observer API**. The component includes a clever architecture for data processing, validation of the response from the API, and robust error handling.

## Core functionality 🧠

### API class

The project uses an abstract API class for unified API handling.

#### Features

- Base URL: Set once when the child class is initialized.

- Response validation: Each response is validated through a `Zod` schema to ensure that the data is correct.

- Method fetcher: Universal method for executing HTTP requests.
- Error Management: A detailed error message is
  generated if the data structure is incorrect.

### API response validation

- Each data upload is rigorously validated through `Zod`.

- `PostSchema` and `PostsSchema` schemas are used to ensure that the response structure is as expected.

- If the data is not valid, the request is terminated with an error, which helps avoid incorrect data display.

### Infinite scrolling with `useIntersection`

- The `useIntersection` hook uses `IntersectionObserver` to track the intersection of an item (ref to “cursor” at the end of the list) with the viewing area.

- Once the user reaches the end of the list, the fetchNextPagePostList colback is triggered.

- Implemented automatic unsubscribe via `observer.disconnect()` when the tracked item is unmounted or changed.

### Data loading

- When the component is first rendered, the first page of posts is loaded.

- Further loading occurs automatically when the end of the list is reached.

### Loading States

- If data is being loaded, the user sees the _Loading...._ message

- Once the data is successfully loaded, it is rendered on the page.

### Working with API

- The `useGetPostList` hook controls request states (load, successful completion, errors).

- Data is loaded page by page via the `fetchNextPage` method.

### Error handling

- The project uses `ErrorBoundary` component for safe operation of the application. It intercepts errors and displays a friendly message to the user.

### Dynamic rendering

- The list of posts is represented as cards (`PostCard`), each of which displays data from the API.

## How it works? 🚀

### API Class

- API class basic structure:

  ```TypeScript
  export abstract class API {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  protected async fetcher<T extends z.ZodTypeAny>({
    endpoint,
    options,
    schema,
    schemaName,
  }: FetcherParams<T>): Promise<z.infer<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      console.error(`Validation error in ${schemaName}:`, validationResult.error);
      throw new Error(`Invalid response for ${schemaName}`);
    }

    return validationResult.data;
    }
  }
  ```

#### Advantages

- Unification of query logic.

- Centralized error handling and validation.

- Easy extensibility for creating new API classes.

### Data validation via Zod

- All data from the API is validated using schemas:

  - `PostSchema`: ensures that the post object contains `userId`, `id`, `title` and `body` fields with valid types.

  - `PostsSchema`: validates an array of `PostSchema` objects.

- This reduces the chance of errors due to incorrect data.

### useIntersection

- The `useIntersection` structure:

  ```TypeScript
  const useIntersection = (onIntersect: () => void) => {
    const unsubscribe = useRef(() => {});
    return useCallback(
      (element: HTMLDivElement | null) => {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(intersection => {
            if (intersection.isIntersecting) {
              onIntersect();
            }
          });
        });

        if (element) {
          observer.observe(element);
          unsubscribe.current = () => observer.disconnect();
        } else {
          unsubscribe.current();
        }
      },
      []
    );
  };
  ```

- The `useIntersection` hook uses `IntersectionObserver` to track the intersection of an item (ref to “cursor” at the end of the list) with the viewport.

- Automatically unsubscribe via observer.disconnect() when the tracked item is unmounted or changed.

- Universal interface for use in all lazy loading scenarios.

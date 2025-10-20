# trycatch

Utility helper that wraps a promise and returns a tuple with an error and the result, keeping your async/await flows concise and predictable.

## Installation

```bash
pnpm add a8-trycatch
```

## Usage

```ts
import { tryCatch } from "a8-trycatch";

async function fetchUser(id: string) {
  const [error, user] = await tryCatch(getUserFromApi, id);

  if (error) {
    // Handle error without additional try/catch blocks
    console.error(error);
    return null;
  }

  return user;
}
```

## API

### `tryCatch<TCallback extends (...args: any[]) => Promise<any>, E = Error>(callback: TCallback, ...args: Parameters<TCallback>): Promise<[E | null, Awaited<ReturnType<TCallback>> | null]>`

- `callback`: Async function returning a promise.
- `...args`: Arguments forwarded to the callback.
- Returns a tuple where the first entry is the error (or `null`) and the second entry is the resolved value (or `null`).
- The generic `E` lets you narrow the error type when you expect something more specific than `Error`.

```ts
class ValidationError extends Error {}

async function mightThrow(): Promise<string> {
  // ...
}

const [error, data] = await tryCatch<typeof mightThrow, ValidationError>(
  mightThrow
);
```

### `tryCatchSync<TCallback extends (...args: any[]) => any, E = Error>(callback: TCallback, ...args: Parameters<TCallback>): [E | null, ReturnType<TCallback> | null]`

- `callback`: Synchronous function to execute.
- `...args`: Arguments forwarded to the callback.
- Returns the same `[error, data]` tuple shape as the async version.
- Narrow the error type with the optional `E` generic parameter.

```ts
function parseUser(json: string) {
  const [error, user] = tryCatchSync(JSON.parse, json);

  if (error) {
    console.error("Invalid payload");
    return null;
  }

  return user;
}
```

## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing.

```bash
pnpm install
pnpm test
```

Use `pnpm test:watch` during development to re-run tests on file changes.

## Build

```bash
pnpm build
```

## License

MIT © alejandrodotor8

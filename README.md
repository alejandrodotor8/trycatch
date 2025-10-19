# trycatch

Utility helper that wraps a promise and returns a tuple with an error and the result, keeping your async/await flows concise and predictable.

## Installation

```bash
pnpm add @a8/trycatch
```

## Usage

```ts
import { tryCatch } from "@a8/trycatch";

async function fetchUser(id: string) {
  const [error, user] = await tryCatch(getUserFromApi(id));

  if (error) {
    // Handle error without additional try/catch blocks
    console.error(error);
    return null;
  }

  return user;
}
```

## API

### `tryCatch<T, E = Error>(promise: Promise<T>): Promise<[E | null, T | null]>`

- `promise`: Promise to execute.
- Returns a tuple where the first entry is the error (or `null`) and the second entry is the resolved value (or `null`).
- The generic `E` lets you narrow the error type when you expect something more specific than `Error`.

```ts
class ValidationError extends Error {}

const [error, data] = await tryCatch<string, ValidationError>(mightThrow());
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

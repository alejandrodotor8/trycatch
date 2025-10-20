type Result<T, E = Error> = [E | null, T | null];

/**
 * Wraps an async function call in a try/catch and returns an error/data tuple.
 * Use it to replace boilerplate `try { await ... } catch (error) {}` flows.
 */
export async function tryCatch<Return, Args extends unknown[], E = Error>(
  callback: (...args: Args) => Promise<Return>,
  ...args: Args
): Promise<Result<Return, E>> {
  try {
    const data = await callback(...args);
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

/**
 * Sync counterpart to `tryCatch`. Useful for pure functions or utilities that may throw.
 */
export function tryCatchSync<Return, Args extends unknown[], E = Error>(
  callback: (...args: Args) => Return,
  ...args: Args
): Result<Return, E> {
  try {
    const data = callback(...args);
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

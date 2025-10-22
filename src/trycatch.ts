type Result<T, E = Error> = [E | null, T | null];
type ResultWithFallback<T, E = Error> = [E | null, T];

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

/**
 * Async helper that preserves the error but always returns a non-null data value.
 * Falls back to `defaultValue` when the callback rejects.
 */
export async function tryCatchOrDefault<
  Return,
  Args extends unknown[],
  E = Error
>(
  callback: (...args: Args) => Promise<Return>,
  defaultValue: Return,
  ...args: Args
): Promise<ResultWithFallback<Return, E>> {
  try {
    const data = await callback(...args);
    return [null, data];
  } catch (error) {
    return [error as E, defaultValue];
  }
}

/**
 * Sync helper with default fallback counterpart to `tryCatchOrDefault`.
 */
export function tryCatchSyncOrDefault<
  Return,
  Args extends unknown[],
  E = Error
>(
  callback: (...args: Args) => Return,
  defaultValue: Return,
  ...args: Args
): ResultWithFallback<Return, E> {
  try {
    const data = callback(...args);
    return [null, data];
  } catch (error) {
    return [error as E, defaultValue];
  }
}

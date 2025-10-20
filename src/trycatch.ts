type Result<T, E = Error> = [E | null, T | null];

export async function tryCatch<
  TCallback extends (...args: any[]) => Promise<any>,
  E = Error
>(
  callback: TCallback,
  ...args: Parameters<TCallback>
): Promise<Result<Awaited<ReturnType<TCallback>>, E>> {
  try {
    const data = await callback(...args);
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

export function tryCatchSync<
  TCallback extends (...args: any[]) => any,
  E = Error
>(
  callback: TCallback,
  ...args: Parameters<TCallback>
): Result<ReturnType<TCallback>, E> {
  try {
    const data = callback(...args);
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

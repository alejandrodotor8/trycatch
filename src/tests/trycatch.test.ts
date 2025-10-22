import { describe, expect, it, vi } from "vitest";
import {
  tryCatch,
  tryCatchOrDefault,
  tryCatchSync,
  tryCatchSyncOrDefault,
} from "../trycatch";

describe("tryCatch", () => {
  it("returns the resolved value and null error when the promise resolves", async () => {
    const [error, data] = await tryCatch(
      async (value: string) => value,
      "value"
    );

    expect(error).toBeNull();
    expect(data).toBe("value");
  });

  it("captures the rejection error and returns null data when the promise rejects", async () => {
    const rejection = new Error("Something went wrong");
    const [error, data] = await tryCatch(async () => {
      throw rejection;
    });

    expect(error).toBe(rejection);
    expect(data).toBeNull();
  });

  it("preserves custom error instances", async () => {
    class CustomError extends Error {}
    const customError = new CustomError("Custom failure");

    const failingTask = (): Promise<never> =>
      Promise.reject<never>(customError);

    const [error] = await tryCatch<never, [], CustomError>(failingTask);

    expect(error).toBeInstanceOf(CustomError);
    expect(error).toBe(customError);
  });

  it("passes arguments to the async callback", async () => {
    const callback = vi.fn(async (a: number, b: number) => a + b);

    const [error, data] = await tryCatch(callback, 2, 3);

    expect(callback).toHaveBeenCalledWith(2, 3);
    expect(error).toBeNull();
    expect(data).toBe(5);
  });
});

describe("tryCatchSync", () => {
  it("returns the value and null error when the function succeeds", () => {
    const [error, data] = tryCatchSync(() => "value");

    expect(error).toBeNull();
    expect(data).toBe("value");
  });

  it("passes arguments to the callback and returns the value", () => {
    const callback = vi.fn((a: number, b: number) => a + b);

    const [error, data] = tryCatchSync(callback, 2, 3);

    expect(callback).toHaveBeenCalledWith(2, 3);
    expect(error).toBeNull();
    expect(data).toBe(5);
  });

  it("captures the rejection error and returns null data when the function throws", () => {
    const rejection = new Error("Something went wrong");
    const [error, data] = tryCatchSync(() => {
      throw rejection;
    });

    expect(error).toBe(rejection);
    expect(data).toBeNull();
  });

  it("preserves custom error instances", () => {
    class CustomError extends Error {}
    const customError = new CustomError("Custom failure");

    const failingTask = (): never => {
      throw customError;
    };

    const [error] = tryCatchSync<never, [], CustomError>(failingTask);

    expect(error).toBeInstanceOf(CustomError);
    expect(error).toBe(customError);
  });
});

describe("tryCatchOrDefault", () => {
  it("returns the resolved value when the promise resolves", async () => {
    const [error, data] = await tryCatchOrDefault(
      async () => "value",
      "default"
    );

    expect(error).toBeNull();
    expect(data).toBe("value");
  });

  it("returns the default value when the promise rejects", async () => {
    const rejection = new Error("Something went wrong");

    const [error, data] = await tryCatchOrDefault(
      async () => {
        throw rejection;
      },
      "default"
    );

    expect(error).toBe(rejection);
    expect(data).toBe("default");
  });

  it("passes arguments to the async callback", async () => {
    const callback = vi.fn(async (a: number, b: number) => a + b);

    const [, data] = await tryCatchOrDefault(callback, 0, 2, 3);

    expect(callback).toHaveBeenCalledWith(2, 3);
    expect(data).toBe(5);
  });
});

describe("tryCatchSyncOrDefault", () => {
  it("returns the value when the function succeeds", () => {
    const [error, data] = tryCatchSyncOrDefault(() => "value", "default");

    expect(error).toBeNull();
    expect(data).toBe("value");
  });

  it("returns the default value when the function throws", () => {
    const rejection = new Error("Something went wrong");

    const [error, data] = tryCatchSyncOrDefault(() => {
      throw rejection;
    }, "default");

    expect(error).toBe(rejection);
    expect(data).toBe("default");
  });

  it("passes arguments to the callback", () => {
    const callback = vi.fn((a: number, b: number) => a + b);

    const [, data] = tryCatchSyncOrDefault(callback, 0, 2, 3);

    expect(callback).toHaveBeenCalledWith(2, 3);
    expect(data).toBe(5);
  });
});

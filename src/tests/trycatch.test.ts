import { describe, expect, it } from "vitest";
import { tryCatch } from "../trycatch";

describe("tryCatch", () => {
  it("returns the resolved value and null error when the promise resolves", async () => {
    const [error, data] = await tryCatch(Promise.resolve("value"));

    expect(error).toBeNull();
    expect(data).toBe("value");
  });

  it("captures the rejection error and returns null data when the promise rejects", async () => {
    const rejection = new Error("Something went wrong");
    const [error, data] = await tryCatch(Promise.reject(rejection));

    expect(error).toBe(rejection);
    expect(data).toBeNull();
  });

  it("preserves custom error instances", async () => {
    class CustomError extends Error {}
    const customError = new CustomError("Custom failure");

    const [error] = await tryCatch<never, CustomError>(
      Promise.reject(customError)
    );

    expect(error).toBeInstanceOf(CustomError);
    expect(error).toBe(customError);
  });
});

import { describe, it, expect } from "@jest/globals";
import { TtlStrCache } from "../index.js";

describe("common cache tests", () => {
	it("has length", () => {
		const cache = TtlStrCache.default();

		expect(cache.length()).toBe(0);
	});

	it("length increases after setting a key", () => {
		const cache = new TtlStrCache();

		cache.set("abv", "123");

		expect(cache.length()).toBe(1);
	});
});

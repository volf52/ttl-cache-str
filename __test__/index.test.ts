import { describe, it, expect } from "@jest/globals";
import { TtlStrCache } from "../index.js";

describe("common cache tests", () => {
	it("has length", () => {
		const cache = TtlStrCache.default();

		expect(cache.length()).toBe(0);
	});

	it("value can be set", () => {
		const cache = new TtlStrCache();

		cache.set("abv", "123");
	});

	it("length increases after setting a key", () => {
		const cache = new TtlStrCache();

		cache.set("abv", "123");

		expect(cache.length()).toBe(1);
	});

	describe("getting a value", () => {
		const cache = new TtlStrCache();

		it("returns null if not present", () => {
			const val = cache.get("something");

			expect(val).toBeNull();
		});

		it("returns the value if present", () => {
			cache.set("something", "value");
			const val = cache.get("something");

			expect(val).toBe("value");
		});
	});

	it("value can be overwritten", () => {
		const key = "randomkey";
		const val1 = "val1";
		const val2 = "val2";

		const cache = new TtlStrCache();

		cache.set(key, val1);

		expect(cache.get(key)).toBe(val1);

		cache.set(key, val2);

		expect(cache.get(key)).toBe(val2);
	});
});

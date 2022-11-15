import { it, expect, describe, jest } from "@jest/globals";
import { setTimeout } from "node:timers/promises";

import { TtlStrCache } from "../index.js";

describe("common cache tests", () => {
	it("has length", () => {
		const cache = new TtlStrCache();

		expect(cache.length).toBe(0);
	});

	it("value can be set", () => {
		const cache = new TtlStrCache();

		cache.set("abv", "123");
	});

	it("length increases after setting a key", () => {
		const cache = new TtlStrCache();

		cache.set("abv", "123");

		expect(cache.length).toBe(1);
	});

	it("has a value if set", () => {
		const cache = new TtlStrCache();

		expect(cache.has("abv")).toBe(false);

		cache.set("abv", "123");

		expect(cache.has("abv")).toBe(true);
	});

	describe("getting a value", () => {
		const cache = new TtlStrCache();

		it("returns null if not present", () => {
			const val = cache.get("something");
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

describe("check expiration", () => {
	const fiveMinutes = 5 * 60 * 1000;
	const one_sec = 1000;
	const five_hundred_ms = 500;

	it("has a value", () => {
		const cache = TtlStrCache.withTimeoutMs(fiveMinutes);

		cache.set("key", "value");
		expect(cache.has("key")).toBe(true);
	});

	it("key expires after ttl", async () => {
		const cache = TtlStrCache.withTimeoutMs(one_sec);

		cache.set("key", "value");
		expect(cache.get("key")).toBe("value");

		await setTimeout(500);
		// time passed ~500ms - shouldn't expire
		expect(cache.length).toBe(1);

		await setTimeout(501);

		// time passed ~1s - should expire
		expect(cache.length).toBe(0);
	});
});

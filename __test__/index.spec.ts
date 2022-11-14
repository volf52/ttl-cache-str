import { it, expect, describe } from "@jest/globals";

import { sum } from "../index.js";

describe("sum", () => {
	it("sum from native", () => {
		expect(sum(1, 2)).toBe(3);
	});
});

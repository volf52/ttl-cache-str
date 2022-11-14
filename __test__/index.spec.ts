import { it, expect } from "@jest/globals";

import { sum } from "../index.js";

it("sum from native", (t) => {
	expect(sum(1, 2)).toBe(3);
});

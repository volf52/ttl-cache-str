// https://jestjs.io/docs/configuration

/** @type {require('@jest/types').Config.InitialOptions} */
const config = {
	moduleFileExtensions: ["js", "mjs", "ts"],
	testEnvironment: "node",
	notify: false,
	rootDir: ".",
	roots: ["__test__"],
	testRegex: ".*\\.(spec|test|integration)\\.(mjs|ts)",
	testPathIgnorePatterns: ["/node_modules/"],
	transform: {
		"^.+\\.(t|j|mj)sx?$": "@swc/jest",
	},
	transformIgnorePatterns: ["/node_modules/"],
};

export default config;

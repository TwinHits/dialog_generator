import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    roots: ["<rootDir>/test",],
    testMatch: ["**/*.test.ts",],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};

export default config;
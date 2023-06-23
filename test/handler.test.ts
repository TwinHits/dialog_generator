import { describe, expect, test } from "@jest/globals";
import { handler } from "../src/handler";

import test_request from "./data/request";

describe("handler", () => {

    test("tests run successfully", () => {
        expect(true).toBeTruthy();
    });

    test("returns successfully", () => {
        const actual = handler(test_request);

        expect(actual).toBeDefined();
        expect(actual).toBeTruthy();
    });
});
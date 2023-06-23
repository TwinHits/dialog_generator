import { describe, expect, test } from "@jest/globals";
import { handler } from "../src/handler";

import api_gateway_proxy_event from "./data/api_gateway_proxy_event";

describe("handler", () => {

    test("tests run successfully", () => {
        expect(true).toBeTruthy();
    });

    test("returns successfully", async () => {
        const actual = await handler(api_gateway_proxy_event);

        expect(actual).toBeDefined();
        expect(actual.statusCode).toEqual(200);
        expect(actual.body).toEqual("Hello world!");
    });
});
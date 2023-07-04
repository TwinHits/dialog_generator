import "dotenv/config";

import { describe, expect, jest, test } from "@jest/globals";
import { handler } from "../../src/index";

import api_gateway_proxy_event from "../data/api_gateway_proxy_event";

import { generate_dialog } from "../../src/generate_dialog";

describe("handler", () => {

    test("tests run successfully", () => {
        expect(true).toBeTruthy();
    });

    test("can access environment variables", () => {
        expect(process.env.BASE_URL).toBeDefined();
        expect(process.env.CHATGPT_API_KEY).toBeDefined();
    });

    test("returns 400 if arguments are missing", async () => {

        const actual = await handler(api_gateway_proxy_event);

        expect(actual).toBeDefined();
        expect(actual.statusCode).toEqual(400);
        expect(actual.body).toEqual("Missing Required Parameters");
    });

    test("parses expected arguments", () => {
        //expect().toBeDefined();
    });
});
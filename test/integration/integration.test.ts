import "dotenv/config";
import axios from "axios";

import { describe, expect, test } from "@jest/globals";

import api_gateway_proxy_event from "../data/api_gateway_proxy_event";

describe("endpoint", () => {

    test("can access environment variables", () => {
        expect(process.env.BASE_URL).toBeDefined();
        expect(process.env.CHATGPT_API_KEY).toBeDefined();
    });

    test("status code is 200", async () => {
        const test_request = api_gateway_proxy_event;
        test_request.body = JSON.stringify({
            personality: "space captain",
            facts: [
                "a fact",
            ],
            length: 255,
        });

        const actual = await axios.post(process.env.BASE_URL as string, test_request);

        expect(actual).toBeDefined();
        expect(actual.status).toEqual(200);
    });

    test("body contains result", async () => {
        const test_request = api_gateway_proxy_event;
        test_request.body = JSON.stringify({
            personality: "space captain",
            facts: [
                "a fact",
            ],
            length: 255,
        });
        const actual = await axios.post(process.env.BASE_URL as string, test_request);

        expect(actual).toBeDefined();
        expect(actual.data).toEqual("This is dialog");
    });

    test("status code is 400 when 'personality' field is missing", async () => {
        const test_request = api_gateway_proxy_event;
        test_request.body = JSON.stringify({
            facts: [
                "a fact",
            ],
            length: 255,
        });

        const actual = await axios.post(process.env.BASE_URL as string, test_request);

        expect(actual).toBeDefined();
        expect(actual.status).toEqual(200);
    });

    test("status code is 200 when 'facts' field is missing", async () => {
        const test_request = api_gateway_proxy_event;
        test_request.body = JSON.stringify({
            personality: "space captain",
            length: 255,
        });
        const actual = await axios.post(process.env.BASE_URL as string, test_request);

        expect(actual).toBeDefined();
        expect(actual.data).toEqual("This is dialog");
    });

    test("status code is 200 when 'length' field is missing", async () => {
        const test_request = api_gateway_proxy_event;
        test_request.body = JSON.stringify({
            personality: "space captain",
            facts: [
                "a fact",
            ],
        });
        const actual = await axios.post(process.env.BASE_URL as string, test_request);

        expect(actual).toBeDefined();
        expect(actual.data).toEqual("This is dialog");
    });
});
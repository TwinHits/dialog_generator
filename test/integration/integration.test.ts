import "dotenv/config";
import axios, { AxiosError } from "axios";

import { describe, expect, test } from "@jest/globals";

describe("endpoint", () => {

    test("can access environment variables", () => {
        expect(process.env.BASE_URL).toBeDefined();
        expect(process.env.CHATGPT_API_KEY).toBeDefined();
    });

    test("status code is 200", async () => {
        const test_request = {
            personality: "space captain",
            facts: [
                "a fact",
            ],
            length: 255,
        };

        try {
            const actual = await axios.post(process.env.BASE_URL as string, test_request);

            expect(actual).toBeDefined();
            expect(actual.status).toEqual(200);
        } catch (error) {
            console.log(error);
            expect(error).not.toBeDefined();
        }
    });

    test("body contains result", async () => {
        const test_request = {
            personality: "space captain",
            facts: [
                "a fact",
            ],
            length: 255,
        };
       
        try {
            const actual = await axios.post(process.env.BASE_URL as string, test_request);

            expect(actual).toBeDefined();
            expect(actual.status).toEqual(200);
            expect(actual.data).toEqual("This is dialog");
        } catch (error) {
            console.log(error);
            expect(error).not.toBeDefined();
        }
    });

    test("status code is 400 when 'personality' field is missing", async () => {
        const test_request = {
            facts: [
                "a fact",
            ],
            length: 255,
        };

        try {
            await axios.post(process.env.BASE_URL as string, test_request);
        } catch (error) {
            const actual = error as AxiosError;
            expect(actual).toBeDefined();
            expect(actual.response).toBeDefined();
            expect(actual.response?.status).toEqual(400);
        }
    });

    test("status code is 200 when 'facts' field is missing", async () => {
        const test_request = {
            personality: "space captain",
            length: 255,
        };

        try {
            const actual = await axios.post(process.env.BASE_URL as string, test_request);

            expect(actual).toBeDefined();
            expect(actual.status).toEqual(200);
            expect(actual.data).toEqual("This is dialog");
        } catch (error) {
            console.log(error);
            expect(error).not.toBeDefined();
        }
    });

    test("status code is 200 when 'length' field is missing", async () => {
        const test_request = {
            personality: "space captain",
            facts: [
                "a fact",
            ],
        };

        try {
            const actual = await axios.post(process.env.BASE_URL as string, test_request);

            expect(actual).toBeDefined();
            expect(actual.status).toEqual(200);
            expect(actual.data).toEqual("This is dialog");
        } catch (error) {
            console.log(error);
            expect(error).not.toBeDefined();
        }
    });
});
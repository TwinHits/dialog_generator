import "dotenv/config";
import axios from "axios";

import { describe, expect, test } from "@jest/globals";

describe("endpoint", () => {

    test("status code is 200", async () => {
        const actual = await axios.post(process.env.BASE_URL as string);

        expect(actual).toBeDefined();
        expect(actual.status).toEqual(200);
    });

    test("body contains result", async () => {
        const actual = await axios.post(process.env.BASE_URL as string);

        expect(actual).toBeDefined();
        expect(actual.data).toEqual("Hello world!");
    });
});
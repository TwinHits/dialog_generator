import { describe, expect, jest, test } from "@jest/globals";

import { generate_dialog } from "../../src/generate_dialog";

import * as openai_api from "openai/api";
import { mock } from "node:test";

describe("generate_dialog", () => {
    const expected_success_message = "This is a success!";
    const expected_error_object = {
        response: {
            status: 400,
            message: "This is the error message.",
        }
    }
    const mock_openai_api = jest.spyOn(openai_api, "OpenAIApi");

    beforeEach(() => {
        jest.clearAllMocks();
        mock_openai_api.mockReturnValue(expected_success_message);
    });


    test("returns OpenAI API response", async () => {
        const test_personality = "";
        const test_facts = [
            "",
        ];
        const test_length = 255;

        const actual = generate_dialog(test_personality, test_facts, test_length);

        expect(actual).toBeDefined();
    });

    test("throws error on OpenAI API error", async () => {
        const test_personality = "";
        const test_facts = [
            "",
        ];
        const test_length = 255;

        const actual = generate_dialog(test_personality, test_facts, test_length);

        expect(actual).toBeDefined();
    });

});
import { describe, expect, jest, test } from "@jest/globals";

import { generate_dialog } from "../../src/generate_dialog";

describe("generate_dialog", () => {


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns", async () => {
        const test_personality = "";
        const test_facts = [
            "",
        ];
        const test_length = 255;

        const actual = generate_dialog(test_personality, test_facts, test_length);

        expect(actual).toBeDefined();
    });

});
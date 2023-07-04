import { describe, expect, jest, test } from "@jest/globals";

import api_gateway_proxy_event from "../data/api_gateway_proxy_event";
import { handler } from "../../src/index";
import * as generate_dialog_methods from "../../src/generate_dialog";

describe("handler", () => {
    const expected_success_body = "This is a success";
    const expected_error_body = "There was an error completing your request.";
    const mock_generate_dialog = jest.spyOn(generate_dialog_methods, "generate_dialog");

    beforeEach(() => {
        jest.clearAllMocks();
        mock_generate_dialog.mockReturnValue(expected_success_body);
    });

    test("returns 400 if required 'personality' field is missing", async () => {
        const test_event = api_gateway_proxy_event;
        test_event.body = JSON.stringify({
            facts: [
                "A fact",
            ],
            length: 255,
        });

        const actual = await handler(test_event);

        expect(actual).toBeDefined();
        expect(mock_generate_dialog).not.toHaveBeenCalled();
        expect(actual.statusCode).toEqual(400);
        expect(actual.body).toEqual("Request missing required 'personality' field.");
    });

    test("returns 400 and missing required 'personality' field error if the body is missing", async () => {
        const test_event = api_gateway_proxy_event;
        test_event.body = undefined as unknown as string;

        const actual = await handler(test_event);

        expect(actual).toBeDefined();
        expect(mock_generate_dialog).not.toHaveBeenCalled();
        expect(actual.statusCode).toEqual(400);
        expect(actual.body).toEqual("Request missing required 'personality' field.");
    });


    test("returns 200 if optional 'facts' field is missing", async () => {
        const test_event = api_gateway_proxy_event;
        test_event.body = JSON.stringify({
            personality: "space captain",
            length: 255,
        });

        const actual = await handler(test_event);

        expect(actual).toBeDefined();
        expect(mock_generate_dialog).toHaveBeenCalled();
        expect(actual.statusCode).toEqual(200);
        expect(actual.body).toEqual(expected_success_body);
    });

    test("returns 200 if optional 'length' field is missing", async () => {
        const test_event = api_gateway_proxy_event;
        test_event.body = JSON.stringify({
            personality: "space captain",
            facts: [
                "A fact",
            ],
        });

        const actual = await handler(test_event);

        expect(actual).toBeDefined();
        expect(mock_generate_dialog).toHaveBeenCalled();
        expect(actual.statusCode).toEqual(200);
        expect(actual.body).toEqual(expected_success_body);
    });

    test("calls method with parsed arguments", async () => {
        const test_personality = "spicy smuggler";
        const test_facts = [
            "A fact",
            "A second fact",
        ];
        const test_length = 255;

        const test_event = api_gateway_proxy_event;
        test_event.body = JSON.stringify({
            personality: test_personality,
            facts: test_facts,
            length: test_length,
        });

        await handler(test_event);

        expect(mock_generate_dialog).toHaveBeenCalled();
        expect(mock_generate_dialog).toHaveBeenCalledWith(test_personality, test_facts, test_length);
    });

    test("returns 500 if method throws an error", async () => {
        const unexpected_error_body = "This is not the expected response body";
        mock_generate_dialog.mockImplementation(() => {
            throw new Error(unexpected_error_body);
        });

        const test_event = api_gateway_proxy_event;
        test_event.body = JSON.stringify({
            personality: "space captain",
            facts: [
                "A fact",
            ],
            length: 255,
        });

        const actual = await handler(test_event);

        expect(actual).toBeDefined();
        expect(mock_generate_dialog).toHaveBeenCalled();
        expect(actual.statusCode).toEqual(500);
        expect(actual.body).toEqual(expected_error_body);
    });

});
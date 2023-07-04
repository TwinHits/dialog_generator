import { describe, expect, test } from "@jest/globals";

import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import * as DialogGenerator from "../../../lib/dialog_generator-stack";

describe("CDK Dialog Generator", () => {
    test("stack created", () => {
        const app = new cdk.App();
        const stack = new DialogGenerator.DialogGeneratorStack(app, "MyTestStack");
        const template = Template.fromStack(stack);

        expect(template).toBeDefined();
    });

    test("can access environment variables", () => {
        expect(process.env.BASE_URL).toBeDefined();
        expect(process.env.CHATGPT_API_KEY).toBeDefined();
    });
});
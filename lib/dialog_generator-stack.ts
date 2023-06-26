import "dotenv/config";

import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

import { Construct } from "constructs";

export class DialogGeneratorStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const TAG_VALUE = "dialog_generator";

        const dialog_generator_lambda = new lambda.Function(this, "dialog_generator_lambda", {
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset("src"),
            handler: "index.handler",
            environment: {
                "CHATGPT_API_KEY": process.env.CHATGPT_API_KEY as string,
            },
        });
        cdk.Tags.of(dialog_generator_lambda).add("project", TAG_VALUE);

        const api_gateway_service = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Dialog Generator Service",
            description: "REST service for Dialog Generator.",
        });
        cdk.Tags.of(api_gateway_service).add("project", TAG_VALUE);

        const post_dialog_integration = new apigateway.LambdaIntegration(dialog_generator_lambda, {
            requestTemplates: { "application/json": "{ \"statusCode\": \"200\" }", },
        });

        api_gateway_service.root.addMethod("POST", post_dialog_integration);
    }
}

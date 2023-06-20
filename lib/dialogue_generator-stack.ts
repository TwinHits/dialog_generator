import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

import { Construct } from "constructs";

export class DialogueGeneratorStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const dialogue_generator_lambda = new lambda.Function(this, "dialogue_generator_lambda", {
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset("src"),
            handler: "handler",
            environment: {
                API_KEY: "KEY"
            }
        });

        const api_gateway_service = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Dialogue Generator Service",
            description: "REST service for Dialogue Generator."
        });

        const post_dialog_integration = new apigateway.LambdaIntegration(dialogue_generator_lambda, {
            requestTemplates: { "application/json": "{ \"statusCode\": \"200\" }" }
        });

        api_gateway_service.root.addMethod("POST", post_dialog_integration);
    }
}

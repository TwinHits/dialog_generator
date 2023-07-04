import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { generate_dialog } from "./generate_dialog";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body) {
        const body = JSON.parse(event.body);
        const personality = body.personality;
        const facts = body.facts;
        const length = body.length;

        const result = generate_dialog(personality, facts, length);
         
        return { 
            statusCode: 200, 
            body: result, 
        };
    } else {
        return { 
            statusCode: 400, 
            body: "Missing Required Parameters", 
        };
    }
};
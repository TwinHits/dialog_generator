import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { generate_dialog } from "./generate_dialog";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        event.body = "{}";
    }

    const body = JSON.parse(event.body);
    const personality = body.personality;
    const facts = body.facts;
    const length = body.length;

    if (!personality) {
        return { 
            statusCode: 400, 
            body: "Request missing required 'personality' field.", 
        };
    } else {
        try {
            return { 
                statusCode: 200, 
                body: generate_dialog(personality, facts, length),
            };
        } catch (error)  {
            return { 
                statusCode: 500, 
                body: "There was an error completing your request.",
            };
        }
    }
};
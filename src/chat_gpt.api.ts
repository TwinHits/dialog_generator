import "dotenv";
import { AxiosResponse } from "axios";
import { Configuration, OpenAIApi } from "openai";
import { CreateChatCompletionResponse, ChatCompletionResponseMessage } from "openai/api";

const configuration = new Configuration({
    apiKey: process.env.CHATGPT_API_KEY,
});

export const post = async (body: unknown): Promise<ChatCompletionResponseMessage | undefined> => {
    try {
        const openai_client = new OpenAIApi(configuration);
        const chatCompletion = await openai_client.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "Hello world", }, ],
        }) as AxiosResponse<CreateChatCompletionResponse>;
        const result = chatCompletion.data.choices[0].message;
        return result;
    } catch (error: any) {
        if (error.response) {
            throw Error(`${error.response.status}: ${error.response.data}`);
          } else {
            throw Error(error.message);
          }
    }
};
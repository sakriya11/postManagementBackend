import { CohereClient } from "cohere-ai";
import config from "../config";
const cohere = new CohereClient({
  token: config.cohereAi.apiKey,
});

export const generateAiText = async (prompt: string): Promise<string> => {
  try {
    const chat = await cohere.generate({
      model: "command",
      prompt: prompt,
    });

    const response = chat.generations[0].text;

    return response;
  } catch (error) {
    console.log(error);
  }
};

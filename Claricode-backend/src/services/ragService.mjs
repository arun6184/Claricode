import pineconePkg from '@pinecone-database/pinecone';
import OpenAI from "openai";
import config from "../config/appConfig.js";

// Initialize Pinecone client with correct properties
const pinecone = new pineconePkg.Pinecone({
  apiKey: config.pineconeApiKey,
  controllerHostUrl: config.pineconeControllerHostUrl, // use full URL, not environment name
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openAiApiKey,
});

export default {
  processQuery,
};

export async function processQuery(user, query) {
  // ... your existing code ...
}

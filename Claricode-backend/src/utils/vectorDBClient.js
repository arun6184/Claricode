import { PineconeClient } from '@pinecone-database/pinecone';
import config from '../config/appConfig.js';

const pinecone = new PineconeClient();

async function init() {
  if (!pinecone._isInitialized) {
    await pinecone.init({
      apiKey: config.pineconeApiKey,
      environment: config.pineconeEnvironment,
    });
  }
}

export async function upsertVectors(indexName, vectors) {
  await init();
  const index = pinecone.Index(indexName);
  return index.upsert({ upsertRequest: { vectors } });
}

export async function queryVectors(indexName, vector, topK = 5) {
  await init();
  const index = pinecone.Index(indexName);
  const queryResponse = await index.query({
    vector,
    topK,
    includeMetadata: true,
  });
  return queryResponse.matches;
}

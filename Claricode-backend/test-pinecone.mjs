// test-pinecone.mjs
import { PineconeClient } from '@pinecone-database/pinecone';

console.log("PineconeClient:", PineconeClient);

const pinecone = new PineconeClient();

console.log("Pinecone client instance created:", pinecone);

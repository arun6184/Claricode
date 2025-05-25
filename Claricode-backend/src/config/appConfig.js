-const config = {
  jwtSecret: process.env.JWT_SECRET || '',
  pineconeApiKey: process.env.PINECONE_API_KEY || '-',
  pineconeControllerHostUrl: process.env.PINECONE_CONTROLLER_HOST_URL || 'https://controller.---.pinecone.io',
  openAiApiKey: process.env.OPENAI_API_KEY || 

export default config;

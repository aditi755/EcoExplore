import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PineconeStore } from '@langchain/pinecone';

let vectorStore;

export async function getVectorStore() {
  console.log('Entering getVectorStore function');
  if (vectorStore) return vectorStore;

  const PINECONE_API_KEY = '2ec20a88-0735-4b3b-a512-6a1068117d8a';
  const PINECONE_ENVIRONMENT = 'aped-4627-b74a';
  const PINECONE_INDEX_NAME = 'ecoexplore';
  const GEMINI_API_KEY = 'AIzaSyA4l9CPHtDAptuqpNB8J_c8u4hIPA-18sA';

  console.log('PINECONE_API_KEY:', PINECONE_API_KEY);
  console.log('PINECONE_ENVIRONMENT:', PINECONE_ENVIRONMENT);
  console.log('PINECONE_INDEX_NAME:', PINECONE_INDEX_NAME);

  console.log('Initializing Pinecone client');
  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });

  console.log('Getting Pinecone index');
  const pineconeIndex = pinecone.Index(PINECONE_INDEX_NAME);

  console.log('Initializing GoogleGenerativeAIEmbeddings');
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: GEMINI_API_KEY,
    modelName: "embedding-001",
  });

  console.log('Creating PineconeStore');
  vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });

  console.log('Vector store created successfully');
  return vectorStore;
}

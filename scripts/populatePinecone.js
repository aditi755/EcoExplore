import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getVectorStore } from '../app/utils/vectorStore.js';
import { sampleData } from '../app/utils/sampleData.js';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function populatePinecone() {
  console.log('Starting populatePinecone function');
  try {
    const vectorStore = await getVectorStore();
    console.log('Vector store initialized');

    for (const item of sampleData) {
      console.log(`Adding document for destination: ${item.destination}`);
      await vectorStore.addDocuments([
        {
          pageContent: item.content,
          metadata: { destination: item.destination },
        },
      ]);
      console.log(`Document added for ${item.destination}`);
    }

    console.log('Pinecone populated with sample data');
  } catch (error) {
    console.error('Error in populatePinecone:', error);
  }
}

console.log('About to call populatePinecone');
populatePinecone().catch(console.error);
console.log('After calling populatePinecone');

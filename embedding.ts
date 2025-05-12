import { App, TFile } from "obsidian";

// Simple hashing embedding: works offline, zero dependencies
function localHashEmbed(text: string): number[] {
  const words = text.toLowerCase().split(/\W+/).slice(0, 100);
  const vec = new Array(300).fill(0);

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      const index = (i * j) % 300;
      vec[index] += words[i].charCodeAt(j);
    }
  }

  return vec;
}

// In-memory vector store (could persist later)
const vectorStore: Record<string, number[]> = {};

export async function processVaultEmbeddings(app: App) {
  const files = app.vault.getMarkdownFiles();

  for (const file of files) {
    const content = await app.vault.read(file);
    const embedding = localHashEmbed(content.slice(0, 1000));

    vectorStore[file.path] = embedding;
    console.log(`Embedded: ${file.path}`);
  }
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

import { App, TFile } from "obsidian";

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export async function processVaultEmbeddings(app: App) {
  const files = app.vault.getMarkdownFiles();
  for (const file of files) {
    const content = await app.vault.read(file);
    const vector = embedText(content);
    // You could cache vectors here in memory or local storage
    console.log(`Embedded vector for ${file.path}:`, vector.slice(0, 5));
  }
}

function embedText(text: string): number[] {
  // Dummy local embedding: simple hash character code mapping
  const words = text.toLowerCase().split(/\W+/).slice(0, 100);
  const vector = Array(300).fill(0);
  words.forEach((word, i) => {
    word.split('').forEach((char, j) => {
      vector[(i * j) % 300] += char.charCodeAt(0);
    });
  });
  return vector;
}

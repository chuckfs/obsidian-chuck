import { App, TFile } from "obsidian";


export function localHashEmbed(text: string): number[] {
  const vec = new Array(256).fill(0);
  const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, ' ');

  for (let i = 0; i < normalized.length - 2; i++) {
    const tri = normalized.slice(i, i + 3);
    const hash = tri.split('').reduce((sum, c, j) => sum + c.charCodeAt(0) * (j + 1), 0);
    vec[hash % 256]++;
  }

  return vec;
}

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      const index = (i * j) % 300;
      vec[index] += words[i].charCodeAt(j);
    }
  }

  return vec;

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

  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

import { App, TFile, Notice, normalizePath } from "obsidian";
import { cosineSimilarity } from "./embedding";

// Shared vector store
export let vectorStore: Record<string, number[]> = {};
const VECTOR_STORE_FILE = ".local-ai-vault-vectors.json";

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

export async function loadVectorStore(app: App) {
  try {
    const path = normalizePath(VECTOR_STORE_FILE);
    const file = app.vault.getAbstractFileByPath(path);

    if (file && file instanceof TFile) {
      const raw = await app.vault.read(file);
      vectorStore = JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Vector store not loaded:", err);
    vectorStore = {};
  }
}

export async function saveVectorStore(app: App) {
  const path = normalizePath(VECTOR_STORE_FILE);
  const content = JSON.stringify(vectorStore, null, 2);
  let file = app.vault.getAbstractFileByPath(path);

  if (file instanceof TFile) {
    await app.vault.modify(file, content);
  } else {
    await app.vault.create(path, content);
  }
}

export async function rebuildVectorStore(app: App) {
  const files = app.vault.getMarkdownFiles();
  for (const file of files) {
    const content = await app.vault.read(file);
    const embedding = localHashEmbed(content.slice(0, 1000));
    vectorStore[file.path] = embedding;
  }

  await saveVectorStore(app);
  new Notice("Embeddings rebuilt.");
}

export async function semanticSearch(app: App, query: string) {
  const queryEmbedding = localHashEmbed(query);
  const results = Object.entries(vectorStore)
    .map(([path, vec]) => ({
      path,
      score: cosineSimilarity(queryEmbedding, vec)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (results.length === 0) {
    new Notice("No matching documents found.");
    return;
  }

  const lines = results.map((r, i) => `${i + 1}. ${r.path} (score: ${r.score.toFixed(3)})`);
  new Notice("Top matches:\n" + lines.join("\n"));
}

  const lines = results.map((r, i) => `${i + 1}. ${r.path} (score: ${r.score.toFixed(3)})`);
  new Notice("Top matches:\n" + lines.join("\n"));

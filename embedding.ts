import { App, TFile } from "obsidian";

// Replace with actual local Ollama embedding call
async function fetchLocalEmbedding(text: string): Promise<number[]> {
  const response = await fetch("http://localhost:11434/api/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "nomic-embed-text", // assumes model is already pulled via `ollama pull`
      prompt: text
    })
  });

  if (!response.ok) {
    console.error("Embedding fetch failed:", await response.text());
    return [];
  }

  const result = await response.json();
  return result.embedding ?? [];
}

// Cache in memory for now; you can persist to JSON or SQLite later
const vectorStore: Record<string, number[]> = {};

export async function processVaultEmbeddings(app: App) {
  const files = app.vault.getMarkdownFiles();

  for (const file of files) {
    const content = await app.vault.read(file);
    const embedding = await fetchLocalEmbedding(content.slice(0, 1000)); // Truncate if needed

    if (embedding.length) {
      vectorStore[file.path] = embedding;
      console.log(`Stored embedding for: ${file.path}`);
    }
  }

  // Placeholder: persist vectorStore here if needed
}

// Utility for cosine similarity between vectors
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

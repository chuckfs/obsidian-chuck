import { App, TFile } from "obsidian";
import { localHashEmbed, cosineSimilarity } from "./embedding";

// Simulated user-label memory store (eventually persist this)
const labelVectors: Record<string, number[]> = {
  "intent/draft": embedLabel("this is a rough idea or outline of future content"),
  "intent/reference": embedLabel("factual or long-term storage content"),
  "emotion/anxious": embedLabel("uncertainty, worry, nervous tone"),
  "emotion/excited": embedLabel("enthusiasm, energy, future focus")
};

function embedLabel(labelDesc: string): number[] {
  return localHashEmbed(labelDesc);
}

export async function suggestTagsForFile(app: App, file: TFile): Promise<string[]> {
  const content = await app.vault.read(file);
  const vec = localHashEmbed(content.slice(0, 1000));

  const scores = Object.entries(labelVectors)
    .map(([label, refVec]) => ({
      label,
      score: cosineSimilarity(vec, refVec)
    }))
    .filter(x => x.score > 0.75) // suggest only strong matches
    .sort((a, b) => b.score - a.score);

  return scores.map(s => s.label);
}

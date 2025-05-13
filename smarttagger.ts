import { App, TFile } from "obsidian";
import { localHashEmbed, cosineSimilarity } from "./embedding";

function embedLabel(desc: string): number[] {
  return localHashEmbed(desc);
}

const labelVectors: Record<string, number[]> = {
  "intent/draft": embedLabel("this is a rough idea or outline of future content"),
  "intent/reference": embedLabel("factual or long-term storage content"),
  "emotion/anxious": embedLabel("uncertainty, worry, nervous tone"),
  "emotion/excited": embedLabel("enthusiasm, energy, future focus")
};

export async function suggestTagsForFile(app: App, file: TFile): Promise<string[]> {
  const raw = await app.vault.read(file);
  const content = raw.replace(/^---[\s\S]*?---/, '').trim(); // remove frontmatter
  const vec = localHashEmbed(content.slice(0, 2000)); // embed deeper slice

  const scores = Object.entries(labelVectors)
    .map(([label, refVec]) => ({
      label,
      score: cosineSimilarity(vec, refVec)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // return top 3 matches

  console.table(scores); // optional debug

  return scores.map(s => s.label);
}

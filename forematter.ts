import { TFile, App } from "obsidian";
import tagSchema from "./tag-schema.json";

export async function classifyAndTag(app: App, file: TFile) {
  const content = await app.vault.read(file);
  const tags = [];

  for (const [category, values] of Object.entries(tagSchema)) {
    for (const tag of values) {
      if (content.toLowerCase().includes(tag)) {
        tags.push(`${category}/${tag}`);
      }
    }
  }

  const updated = `---\ntags: [${tags.join(", ")}]\n---\n${content}`;
  await app.vault.modify(file, updated);
}

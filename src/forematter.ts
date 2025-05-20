import { App, TFile } from "obsidian";
import { suggestTagsForFile } from "./smarttagger";
import yaml from "js-yaml";

// Helper to parse frontmatter
function parseFrontmatter(content: string): { frontmatter: any, body: string } {
  if (!content.startsWith("---")) return { frontmatter: {}, body: content };

  const end = content.indexOf("---", 3);
  if (end === -1) return { frontmatter: {}, body: content };

  const front = content.slice(3, end).trim();
  const body = content.slice(end + 3).trimStart();
  return { frontmatter: yaml.load(front) || {}, body };
}

// Inject new tags into frontmatter
export async function classifyAndTag(app: App, file: TFile) {
  const raw = await app.vault.read(file);
  const { frontmatter, body } = parseFrontmatter(raw);

  const newTags = new Set<string>(frontmatter?.tags ?? []);
  const suggestions = await suggestTagsForFile(app, file);

  for (const tag of suggestions) {
    newTags.add(tag);
  }

  const updatedFront = yaml.dump({ ...frontmatter, tags: Array.from(newTags) });
  const updated = `---\n${updatedFront}---\n${body}`;

  await app.vault.modify(file, updated);
}

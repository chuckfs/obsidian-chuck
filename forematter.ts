import { TFile, App } from "obsidian";
import tagSchema from "./tag-schema.json";
import yaml from "js-yaml";

// Helper to parse frontmatter from file text
function parseFrontmatter(content: string): { frontmatter: any, body: string } {
  if (!content.startsWith("---")) return { frontmatter: {}, body: content };

  const end = content.indexOf("---", 3);
  if (end === -1) return { frontmatter: {}, body: content };

  const front = content.slice(3, end).trim();
  const body = content.slice(end + 3).trimStart();
  return { frontmatter: yaml.load(front) || {}, body };
}

// Classify and inject tags into YAML frontmatter
export async function classifyAndTag(app: App, file: TFile) {
  const raw = await app.vault.read(file);
  const { frontmatter, body } = parseFrontmatter(raw);

  const contentLower = raw.toLowerCase();
  const newTags = new Set<string>(frontmatter?.tags ?? []);

  for (const [category, values] of Object.entries(tagSchema)) {
    for (const tag of values) {
      if (contentLower.includes(tag)) {
        newTags.add(`${category}/${tag}`);
      }
    }
  }

  const updatedFront = yaml.dump({ ...frontmatter, tags: Array.from(newTags) });
  const updated = `---\n${updatedFront}---\n${body}`;

  await app.vault.modify(file, updated);
}

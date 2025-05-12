import { Plugin } from "obsidian";
import { loadVectorStore, rebuildVectorStore, semanticSearch } from "./semanticSearch";
import { LocalAISettingsTab } from "./settingstab"; // Optional: remove if not needed

export default class LocalAIVaultPlugin extends Plugin {
  async onload() {
    console.log("Loading Local AI Vault Plugin");

    // Load vector index from vault
    await loadVectorStore(this.app);

    // Register command: Rebuild the embedding index
    this.addCommand({
      id: "rebuild-embeddings",
      name: "Rebuild Embedding Index",
      callback: async () => {
        await rebuildVectorStore(this.app);
      }
    });

    // Register command: Semantic search
    this.addCommand({
      id: "semantic-search",
      name: "Semantic Search Notes",
      callback: async () => {
        const query = await this.app.prompt("Enter your search query:");
        if (query) await semanticSearch(this.app, query);
      }
    });

    // Optional settings tab
    this.addSettingTab(new LocalAISettingsTab(this.app, this));
  }

  onunload() {
    console.log("Unloading Local AI Vault Plugin");
  }
}

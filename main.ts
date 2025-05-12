import { Plugin } from "obsidian";
import { loadVectorStore, rebuildVectorStore, semanticSearch } from "./semanticSearch";
import { CustomModal } from "./custommodal";
import { LocalAISettingsTab } from "./settingstab"; // Optional

export default class LocalAIVaultPlugin extends Plugin {
  async onload() {
    console.log("Loading Local AI Vault Plugin");

    await loadVectorStore(this.app);

    this.addCommand({
      id: "rebuild-embeddings",
      name: "Rebuild Embedding Index",
      callback: async () => {
        await rebuildVectorStore(this.app);
      }
    });

    this.addCommand({
      id: "semantic-search",
      name: "Semantic Search Notes",
      callback: async () => {
        const query = await this.app.prompt("Enter your search query:");
        if (query) await semanticSearch(this.app, query);
      }
    });

    this.addCommand({
      id: "open-ai-modal",
      name: "Ask Vault (Modal)",
      callback: () => new CustomModal(this.app).open()
    });

    this.addSettingTab(new LocalAISettingsTab(this.app, this));
  }

  onunload() {
    console.log("Unloading Local AI Vault Plugin");
  }
}

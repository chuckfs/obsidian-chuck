import { Plugin, Notice } from "obsidian";
import { loadVectorStore, rebuildVectorStore, semanticSearch } from "./semanticsearch";
import { CustomModal } from "./custommodal";
import { LocalAISettingsTab } from "./settingstab";

export default class ChuckPlugin extends Plugin {
  async onload() {
    console.log("Loading Chuck - Offline AI Plugin");

    await loadVectorStore(this.app);

    this.addCommand({
      id: "rebuild-embeddings",
      name: "Rebuild Embedding Index",
      callback: async () => {
        await rebuildVectorStore(this.app);
        new Notice("Embeddings rebuilt.");
      }
    });

    this.addCommand({
      id: "semantic-search",
      name: "Semantic Search Notes",
      callback: async () => {
        new CustomModal(this.app, async (query) => {
          if (query) {
            await semanticSearch(this.app, query);
          }
        }).open();
      }
    });

    this.addCommand({
      id: "open-ai-modal",
      name: "Ask Vault (Modal)",
      callback: () => {
        const file = this.app.workspace.getActiveFile();
        if (file) {
          new CustomModal(this.app, () => {}).open();
        } else {
          new Notice("No active file selected.");
        }
      }
    });

    this.addSettingTab(new LocalAISettingsTab(this.app, this));
  }

  onunload() {
    console.log("Unloading Chuck Plugin");
  }
}

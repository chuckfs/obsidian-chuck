import { Plugin } from "obsidian";
import { loadVectorStore, rebuildVectorStore, semanticSearch } from "./semanticsearch";
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
// Inside main.ts, within the addCommand for 'open-ai-modal'
callback: () => {
  const activeFile = this.app.workspace.getActiveFile(); // Get current file
  if (activeFile) { // Check if a file is open
    new CustomModal(this.app, activeFile).open(); // Pass both app and file
  } else {
    // Optional: Notify user if no file is active
    new (this.app.Notice || window.Notice)("No active file selected.");
  }
}    });

    this.addSettingTab(new LocalAISettingsTab(this.app, this));
  }

  onunload() {
    console.log("Unloading Local AI Vault Plugin");
  }
}

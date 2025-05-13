import { Plugin, Notice } from "obsidian";
import { loadVectorStore, rebuildVectorStore, semanticSearch } from "./semanticsearch";
import { CustomModal } from "./custommodal";
import { LocalAISettingsTab } from "./settingstab";
import { classifyAndTag } from "./forematter";

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
        const file = this.app.workspace.getActiveFile();
        if (file) {
          new CustomModal(this.app, file).open();
        } else {
          new Notice("No active file selected.");
        }
      }
    });

    this.addCommand({
      id: "manual-tag-modal",
      name: "Tag Note with Suggested Labels",
      callback: () => {
        const file = this.app.workspace.getActiveFile();
        if (file) {
          new CustomModal(this.app, file).open();
        } else {
          new Notice("No active file selected.");
        }
      }
    });

    this.addCommand({
      id: "autotag-vault",
      name: "Autotag All Notes in Vault",
      callback: async () => {
        const files = this.app.vault.getMarkdownFiles();
        let tagged = 0;

        for (const file of files) {
          try {
            await classifyAndTag(this.app, file);
            tagged++;
          } catch (e) {
            console.warn(`Autotag skipped ${file.path}: ${e.message}`);
          }
        }

        new Notice(`Tagged ${tagged} notes across vault.`);
      }
    });

  }

  onunload() {
    console.log("Unloading Chuck Plugin");
  }
}

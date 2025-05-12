import { App, Modal, TextComponent, ButtonComponent } from "obsidian";
import { localHashEmbed, cosineSimilarity } from "./embedding";
import { vectorStore, loadVectorStore } from "./semanticSearch";

export class CustomModal extends Modal {
  async onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Ask your vault:" });

    const input = new TextComponent(contentEl);
    input.inputEl.style.width = "100%";

    const resultContainer = contentEl.createDiv();

    await loadVectorStore(this.app);

    new ButtonComponent(contentEl)
      .setButtonText("Ask")
      .onClick(async () => {
        const query = input.getValue();
        const queryVec = localHashEmbed(query);

        const results = Object.entries(vectorStore)
          .map(([path, vec]) => ({
            path,
            score: cosineSimilarity(queryVec, vec),
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        resultContainer.empty();
        resultContainer.createEl("h4", { text: "Top Matches:" });

        results.forEach((res, i) => {
          resultContainer.createEl("div", {
            text: `${i + 1}. ${res.path} (${res.score.toFixed(3)})`,
          });
        });
      });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

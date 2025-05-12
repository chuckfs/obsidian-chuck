import { App, Modal, TextComponent, ButtonComponent } from "obsidian";

export class CustomModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Ask your vault:" });

    const input = new TextComponent(contentEl);
    input.inputEl.style.width = "100%";

    new ButtonComponent(contentEl)
      .setButtonText("Ask")
      .onClick(async () => {
        const query = input.getValue();
        contentEl.createEl("p", { text: `Query: ${query}` });
        // TODO: Add search + inference logic
      });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

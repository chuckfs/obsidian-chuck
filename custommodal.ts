import { App, Modal, ButtonComponent, Setting } from "obsidian";
import { TFile } from "obsidian";
import { suggestTagsForFile } from "./smarttagger";
import { classifyAndTag } from "./forematter";

export class CustomModal extends Modal {
  private file: TFile;

  constructor(app: App, file: TFile) {
    super(app);
    this.file = file;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "Suggested Tags for This Note" });

    const tags = await suggestTagsForFile(this.app, this.file);
    const selectedTags = new Set(tags);

    if (tags.length === 0) {
      contentEl.createEl("p", { text: "No strong tag suggestions found." });
      return;
    }

    tags.forEach(tag => {
      new Setting(contentEl)
        .setName(tag)
        .addToggle(toggle =>
          toggle.setValue(true).onChange(value => {
            if (value) selectedTags.add(tag);
            else selectedTags.delete(tag);
          })
        );
    });

    new ButtonComponent(contentEl)
      .setButtonText("Apply Tags")
      .setCta()
      .onClick(async () => {
        await this.applySelectedTags(Array.from(selectedTags));
        this.onClose()();
      });

    new ButtonComponent(contentEl)
      .setButtonText("Cancel")
      .onClick(() => this.onClose()());
  }

  async applySelectedTags(tags: string[]) {
    const content = await this.app.vault.read(this.file);
    const updated = await this.injectTags(content, tags);
    await this.app.vault.modify(this.file, updated);
  }

  async injectTags(content: string, tags: string[]): Promise<string> {
    const frontTag = `tags: [${tags.join(", ")}]`;

    if (content.startsWith("---")) {
      const end = content.indexOf("---", 3);
      const front = content.slice(0, end + 3);
      const body = content.slice(end + 3).trimStart();

      const newFront = front.replace(/tags:\s*\[.*?\]/, frontTag) || `${front}\n${frontTag}`;
      return `${newFront}\n\n${body}`;
    }

    return `---\n${frontTag}\n---\n\n${content}`;
  }

  onClose() {
    this.contentEl.empty();
  }
}

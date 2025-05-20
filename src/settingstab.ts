import { PluginSettingTab, App, Setting } from "obsidian";

export class LocalAISettingsTab extends PluginSettingTab {
  plugin: any;

  constructor(app: App, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Local AI Settings" });

    new Setting(containerEl)
      .setName("Enable Auto-tagging")
      .setDesc("Automatically tag notes based on content")
      .addToggle(toggle => toggle.setValue(true).onChange(val => {
        console.log("Auto-tagging enabled:", val);
      }));
  }
}

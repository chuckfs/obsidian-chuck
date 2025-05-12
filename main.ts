import { Plugin } from "obsidian";
import { LocalAISettingsTab } from "./settings-tab";
import { registerAssistantCommands } from "./commands";
import { processVaultEmbeddings } from "./embedding";
import { classifyAndTag } from "./formatter";

export default class LocalAIPlugin extends Plugin {
  async onload() {
    console.log("Loading Local AI Vault Manager...");
    this.addSettingTab(new LocalAISettingsTab(this.app, this));
    registerAssistantCommands(this);
    await processVaultEmbeddings(this.app);
  }

  async onunload() {
    console.log("Unloading Local AI Vault Manager...");
  }
}

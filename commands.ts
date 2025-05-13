import { Plugin } from "obsidian";
import { CustomModal } from "./custommodal";
import { classifyAndTag } from "./formatter";

export function registerAssistantCommands(plugin: Plugin) {
  plugin.addCommand({
    id: "ai-assistant-classify-note",
    name: "Classify Current Note",
    callback: async () => {
      const file = plugin.app.workspace.getActiveFile();
      if (file) await classifyAndTag(plugin.app, file);
    },
  });

  plugin.addCommand({
    id: "ai-query",
    name: "Ask AI a Question",
    callback: () => new CustomModal(plugin.app).open(),
  });
}

// commands.ts
import { Plugin, Notice } from "obsidian"; // Make sure Notice is imported
import { CustomModal } from "./custommodal"; // Ensure this path and case are correct
// If classifyAndTag is used in this file and comes from forematter:
import { classifyAndTag } from "./forematter"; // Check if this is the correct path and if it's used here

export function registerAssistantCommands(plugin: Plugin) {
  // Your existing 'ai-assistant-classify-note' command here...
  // For example:
  plugin.addCommand({
    id: "ai-assistant-classify-note",
    name: "Classify Current Note",
    callback: async () => {
      const file = plugin.app.workspace.getActiveFile();
      if (file) {
        // Assuming classifyAndTag is still from 'forematter' and you want to use it
        // If 'forematter.ts' (or formatter.ts) doesn't exist or is not used here, adjust accordingly
        await classifyAndTag(plugin.app, file);
      }
    },
  });

  plugin.addCommand({
    id: "ai-query",
    name: "Ask AI a Question",
    callback: () => { // <--- This is the line around your errors (approx. line 17 or 18 depending on imports)
      const activeFile = plugin.app.workspace.getActiveFile(); // This should be INSIDE the arrow function
      if (activeFile) {
        new CustomModal(plugin.app, activeFile).open();
      } else {
        new Notice("No active file selected.");
      }
    }, // <--- Make sure this comma is here if there are more commands after this one in this function
  });

  // If you have other commands, they would follow here.
}

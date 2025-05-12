Here is the fully copy-paste ready README.md with all formatting issues fixed:

⸻


# Local AI Vault

**Local AI Vault** is an **offline-first** AI assistant and vault manager plugin for Obsidian. It performs intelligent context tagging, semantic search, and basic reasoning using only local computation. No APIs. No cloud. No setup.

---

## Features

- **Offline-Only AI Reasoning**
  - Embeds and summarizes notes using local vectorization.
  - Tags notes using customizable semantic schema (`intent`, `emotion`, `energy`, `state`).

- **Contextual Command Assistant**
  - Natural language queries and commands via in-app modal.
  - Example: _"Summarize all anxious drafts from this week."_

- **Vault Intelligence**
  - Classifies, tags, and organizes notes in-memory.
  - Processes all markdown files across your vault.
  - Cosine similarity–based local semantic search.

---

## Installation

1. Clone or download this repository.
2. Copy the contents into your `.obsidian/plugins/local-ai-vault/` directory.
3. Enable **Local AI Vault** from the Obsidian **Community Plugins** tab.

---

## Usage

### Commands

- `Classify Current Note`: Adds frontmatter tags based on note content.
- `Ask AI a Question`: Opens a modal to ask natural language queries.

### Settings

- Toggle automatic tagging behavior.
- Customize tag schema via `tag-schema.json`.

---

## Tag Schema

All classification is driven by `tag-schema.json`:

```json
{
  "intent": ["plan", "archive", "draft", "reference"],
  "emotion": ["anxious", "calm", "numb", "excited"],
  "energy": ["light", "dense", "obsessive"],
  "state": ["seed", "sprout", "paused", "returned"]
}
```

⸻

FAQ

Q: Does this plugin work offline?
A: Yes. It operates 100% locally with no external calls.

Q: How do I reset or clear all embeddings?
A: Delete or modify any cached vector data or restart Obsidian with the plugin reloaded.

⸻

Troubleshooting
	•	Nothing happens when I run a command:
Make sure the plugin is enabled and that you have a file open.
	•	Tags don’t appear:
Ensure tag-schema.json exists and is valid JSON.

⸻

Advanced Usage
	•	Modify tag-schema.json to reflect your personal tagging schema.
	•	Integrate with hotkeys for faster modal access.
	•	Combine with daily notes or canvas plugins for planning workflows.

⸻

Contributing
	1.	Fork this repo.
	2.	Create a branch: feature/your-feature.
	3.	Commit changes with clear, conventional messages.
	4.	Submit a pull request to main.

Use formatter.test.ts as a reference for feature testing and validation.

⸻

License

MIT

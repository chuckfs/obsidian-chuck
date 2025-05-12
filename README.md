# Local AI Vault

**Local AI Vault** is a 100% offline, Obsidian-exclusive AI assistant for intelligent note organization, tagging, and semantic search — with zero API usage, no setup, and full data privacy.

---

## Offline-Only by Design

- No OpenAI, no internet calls
- No keys, accounts, or network access
- All embeddings and search happen locally in your vault

---

## Features

- **Smart Semantic Tagging**  
  Dynamically infers tags based on the content of each note using local similarity-based classification.

- **Vector-Based Semantic Search**  
  Search your notes by meaning, not keywords, using a cosine similarity search on local hash embeddings.

- **Interactive Tag Suggestion Modal**  
  Ask the plugin to suggest tags for a note, confirm or adjust them interactively, and apply directly.

- **Automatic Vault Embedding**  
  All markdown files are vectorized locally. No need for pre-trained models or downloads.

---

## Commands

- `Suggest Smart Tags`  
  Uses your note content to suggest tags like `intent/draft`, `emotion/excited`, etc.

- `Rebuild Embedding Index`  
  Reprocesses all markdown files and updates their internal vector representations.

- `Semantic Search Notes`  
  Enter a question or topic and get back the most contextually relevant notes in your vault.

---

## Files & Architecture

- `main.ts` — Core plugin loader
- `embedding.ts` — Local-only hash embedding function
- `semanticsearch.ts` — Vector storage + search engine
- `smarttagger.ts` — Dynamic content-based tag classifier
- `forematter.ts` — Frontmatter tag injector
- `custommodal.ts` — Modal UI for asking and confirming tags
- `settingstab.ts`, `plugin.css` — Plugin settings & style

---

## How It Works

The plugin reads your note content, embeds it using a local algorithm, compares it to semantic label vectors (e.g., for tags like `state/sprout` or `emotion/anxious`), and suggests appropriate metadata.

This all happens **inside Obsidian**, with no cloud models, APIs, or network usage.

---

## What It Doesn't Do

- No OpenAI / LLMs
- No internet connection required
- No analytics, sync tracking, or telemetry

---

## Installation

> Manual Installation:
1. Clone or download this repo.
2. Build with rollup or esbuild to produce main.js.
3. Copy main.js, manifest.json, styles.css into .obsidian/plugins/local-ai-vault/.
4. Enable the plugin in Obsidian → Community Plugins.

---

## License

MIT


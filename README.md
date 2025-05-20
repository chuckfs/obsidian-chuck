# Chuck — Offline AI Vault Manager for Obsidian

**Chuck** is a 100% offline AI assistant for intelligent note tagging, semantic search, and vector organization — built exclusively for Obsidian. No APIs. No cloud. Just your vault.

![GitHub release (latest by date)](https://img.shields.io/github/v/release/chuckfs/obsidian-chuck)
![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22obsidian-chuck%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)
![License](https://img.shields.io/github/license/chuckfs/obsidian-chuck)

## Installation

### Method 1: Within Obsidian (Recommended)

1. Open Obsidian
2. Go to Settings > Community plugins
3. Disable Safe mode if currently enabled
4. Click "Browse" to open the Community Plugins browser
5. Search for "Chuck"
6. Click "Install"
7. Once installed, enable the plugin by toggling the switch

### Method 2: Manual Installation

1. Download the latest release (`main.js`, `manifest.json`, and `styles.css`) from the [releases page](https://github.com/chuckfs/obsidian-chuck/releases)
2. Create a folder named `obsidian-chuck` in your vault's `.obsidian/plugins/` directory
3. Copy the downloaded files into that folder
4. Restart Obsidian
5. Enable the plugin in Settings > Community plugins

## Features

- **Smart Semantic Tagging**  
  Suggests tags like `intent/draft` or `emotion/excited` by analyzing note content using local embeddings.

- **Vector-Based Semantic Search**  
  Find notes by meaning, not keywords. Uses cosine similarity search over embedded content.

- **Interactive Tag Modal**  
  Lets you confirm and apply suggested tags via a modal UI.

- **Automatic Vault Embedding**  
  All notes are embedded on demand — no pretraining or internet required.

## Screenshots

![Smart Tagging](https://raw.githubusercontent.com/chuckfs/obsidian-chuck/main/.github/images/smart-tagging.png)
![Semantic Search](https://raw.githubusercontent.com/chuckfs/obsidian-chuck/main/.github/images/semantic-search.png)

## Offline-Only by Design

- No OpenAI or internet calls
- No API keys or cloud accounts
- All processing and embeddings happen locally

## Plugin Commands

- `Tag Note with Suggested Labels`  
  Interactive modal for approving and applying tag suggestions to the active note.

- `Rebuild Embedding Index`  
  Reprocesses all markdown files and refreshes vector data.

- `Semantic Search Notes`  
  Uses your query to retrieve the most semantically related notes.

## Settings

Access the plugin settings by going to Settings > Chuck.

| Setting | Description | Default |
|---------|-------------|---------|
| Embedding Depth | Controls the semantic depth for embeddings | Medium |
| Auto-Tag on Save | Automatically suggests tags when saving a note | Disabled |
| Max Tag Suggestions | Maximum number of tags to suggest | 5 |
| Confidence Threshold | Minimum confidence level to show tag suggestions | 70% |

## How It Works

1. Chuck reads the active note content.
2. It generates a vector using local hash embeddings.
3. It compares this vector to semantic label vectors for tags like:
   - `intent/draft`, `state/seed`, `emotion/calm`, etc.
4. It suggests relevant tags with confidence scores.
5. You can confirm or reject them interactively.

## 🔌 No Cloud Dependency

Chuck is completely self-contained. It never sends your notes outside Obsidian or requires internet access.

## Architecture

- `main.ts` — Plugin entrypoint and command registration  
- `embedding.ts` — Local hashing and embedding  
- `semanticsearch.ts` — In-memory vector store and similarity search  
- `smarttagger.ts` — Content-based tag classifier  
- `forematter.ts` — Frontmatter reader/injector  
- `custommodal.ts` — Interactive UI for tag confirmation  
- `settingstab.ts` — Optional plugin settings tab  
- `plugin.css` — Minimal UI styles

## Local Development

```bash
# Clone the repository
git clone https://github.com/chuckfs/obsidian-chuck.git
cd obsidian-chuck

# Install dependencies
npm install

# Build for production
npm run build

# Development with auto-reload
npm run dev
```

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) file for details about new features and changes.

## License

[MIT License](LICENSE)

## Support

If you find this plugin useful, consider [sponsoring the development](https://github.com/sponsors/chuckfs).

---

Created by [Charles E. Drain (CHUCK)](https://github.com/chuckfs)

```bash
npm install
npm run build

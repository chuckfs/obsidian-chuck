# Chuck — Offline AI Vault Manager for Obsidian

**Chuck** is a 100% offline AI assistant for intelligent note tagging, semantic search, and vector organization — built exclusively for Obsidian. No APIs. No cloud. Just your vault.

---

## 🔒 Offline-Only by Design

- ✅ No OpenAI or internet calls
- ✅ No API keys or cloud accounts
- ✅ All processing and embeddings happen locally

---

## ✨ Features

- **Smart Semantic Tagging**  
  Suggests tags like `intent/draft` or `emotion/excited` by analyzing note content using local embeddings.

- **Vector-Based Semantic Search**  
  Find notes by meaning, not keywords. Uses cosine similarity search over embedded content.

- **Interactive Tag Modal**  
  Lets you confirm and apply suggested tags via a modal UI.

- **Automatic Vault Embedding**  
  All notes are embedded on demand — no pretraining or internet required.

---

## ⚙️ Plugin Commands

- `Tag Note with Suggested Labels`  
  Interactive modal for approving and applying tag suggestions to the active note.

- `Rebuild Embedding Index`  
  Reprocesses all markdown files and refreshes vector data.

- `Semantic Search Notes`  
  Uses your query to retrieve the most semantically related notes.

---

## 🧠 Architecture

- `main.ts` — Plugin entrypoint and command registration  
- `embedding.ts` — Local hashing and embedding  
- `semanticsearch.ts` — In-memory vector store and similarity search  
- `smarttagger.ts` — Content-based tag classifier  
- `forematter.ts` — Frontmatter reader/injector  
- `custommodal.ts` — Interactive UI for tag confirmation  
- `settingstab.ts` — Optional plugin settings tab  
- `plugin.css` — Minimal UI styles

---

## 🛠 How It Works

1. Chuck reads the active note content.
2. It generates a vector using local hash embeddings.
3. It compares this vector to semantic label vectors for tags like:
   - `intent/draft`, `state/seed`, `emotion/calm`, etc.
4. It suggests relevant tags with confidence scores.
5. You can confirm or reject them interactively.

---

## 🚫 No Cloud Dependency

Chuck is completely self-contained. It never sends your notes outside Obsidian or requires internet access.

---

## 🔧 Local Development

```bash
npm install
npm run build

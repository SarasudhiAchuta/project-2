# DevStudio ✦ Live CSS Generator & Markdown Workspace

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**DevStudio** is a high-performance, developer-focused browser workspace that unifies interactive **CSS Generators** and a real-time **Markdown Editor & Previewer** into an aesthetic, streamlined developer dashboard.

---

## 🚀 Features

### 🎨 1. Interactive CSS Generators
A suite of visual CSS generators with real-time previews, instant presets, and one-click CSS clipboard export:
- **Gradient Generator**: Craft Linear, Radial, and Conic gradients with customizable color stops, angle dials, and curated color palettes.
- **Box Shadow Builder**: Layer multi-depth box shadows with X/Y offset, blur, spread, opacity controls, and inset mode.
- **Border Radius Editor**: Customize 8-point corner curvature independently or with uniform sliders, featuring shape presets (card, pill, organic, circle).
- **Text Shadow Generator**: Multi-layer typography shadows with custom text preview, blur radius, color picker, and quick styling presets (neon, 3D, retro, subtle).
- **CSS Transition Builder**: Interactive transition generator supporting timing functions (ease, cubic-bezier presets), duration/delay sliders, and a live interactive preview box to test animations on hover.

### 📝 2. Markdown Workspace
A distraction-free, split-pane Markdown authoring tool:
- **Live Side-by-Side Preview**: Synchronous rendering as you type.
- **GitHub Flavored Markdown (GFM)**: Full support for tables, checklists, strikethrough, blockquotes, and headings.
- **Syntax Highlighting**: Powered by `highlight.js` with `github-dark-dimmed` theme.
- **Secure Rendering**: Sanitized output through `DOMPurify` to defend against XSS injection.
- **Document Telemetry**: Live metrics for word count, character count, total lines, and reading time estimation.
- **Export & Download**: One-click download as `.md` file or copy sanitized HTML directly to your clipboard.

### ⚙️ 3. Workspace Experience & Themes
- **Dark & Light Mode**: Fluid theme toggle with state stored in `localStorage` and system preference detection.
- **Settings Drawer**: Customize accent colors, editor typography (*JetBrains Mono*, *Fira Code*, *System Mono*), preview fonts (*Inter*, *System UI*, *Georgia*), tab spacing, and line wrapping.
- **Keyboard Shortcuts**: Quick overlay modal accessible via `?` or toolbar button, featuring global hotkeys like `Ctrl + K` (toggle theme) and `Esc` (close dialogs).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Markdown Parsing**: [Marked](https://marked.js.org/)
- **HTML Sanitization**: [DOMPurify](https://github.com/cure53/DOMPurify)
- **Syntax Highlighting**: [Highlight.js](https://highlightjs.org/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation

1. **Clone the repository or navigate to the project directory:**
   ```bash
   cd "project - 2"
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

## 🖥️ Running the Project

### 1. Start Development Server
To start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

By default, the application runs at:
```
http://localhost:5173/
```
*(If port 5173 is in use, Vite will automatically select the next available port).*

### 2. Build for Production
To generate an optimized, minified production build in the `dist/` directory:
```bash
npm run build
```

### 3. Preview Production Build
To test the built production application locally:
```bash
npm run preview
```

### 4. Run Code Linter
To analyze your code with Oxlint:
```bash
npm run lint
```

---

## 📂 Project Structure

```
project - 2/
├── index.html                   # HTML entry point with meta tags & Google fonts
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration with React & Tailwind plugins
├── src/
│   ├── main.jsx                 # React root injection & highlight.js CSS
│   ├── App.jsx                  # Main application container & modal coordinator
│   ├── index.css                # Tailwind directives & Markdown prose styling
│   ├── components/
│   │   ├── Navbar.jsx           # Header with tabs, theme toggle & settings trigger
│   │   ├── CssToolsPanel.jsx    # Container for all 5 CSS generator cards
│   │   ├── GradientGenerator.jsx# Linear, radial & conic gradient builder
│   │   ├── BoxShadowBuilder.jsx # Multi-layer box-shadow tool
│   │   ├── BorderRadiusEditor.jsx# 8-point border radius tool
│   │   ├── TextShadowGenerator.jsx# Multi-layer text-shadow generator
│   │   ├── TransitionGenerator.jsx# Visual transition & timing function tool
│   │   ├── MarkdownWorkspace.jsx# Split-screen editor container
│   │   ├── MarkdownEditor.jsx   # Input textarea with keyboard formatting hooks
│   │   ├── MarkdownPreview.jsx  # Sanitized, styled Markdown preview pane
│   │   ├── EditorToolbar.jsx    # Quick formatting buttons & export actions
│   │   ├── SettingsModal.jsx    # Preferences drawer (accent colors & fonts)
│   │   ├── KeyboardShortcutsModal.jsx # Hotkey cheatsheet modal
│   │   └── CopyButton.jsx       # Reusable animated copy-to-clipboard button
│   ├── hooks/
│   │   ├── useTheme.js          # Dark/light theme management with localStorage
│   │   ├── useSettings.js       # App settings & accent color provider
│   │   └── useMarkdown.js       # Markdown parser, sanitizer & stats calculator
│   └── data/
│       └── defaultMarkdown.js   # Starter template document for Markdown workspace
└── dist/                        # Production build output
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
| --- | --- | --- |
| `Ctrl + K` / `Cmd + K` | Toggle Light / Dark Mode | Global |
| `?` | Open Keyboard Shortcuts Modal | Global |
| `Esc` | Close Active Modal / Drawer | Global |
| `Ctrl + B` | Format selection as Bold | Markdown Editor |
| `Ctrl + I` | Format selection as Italic | Markdown Editor |
| `Ctrl + E` | Format selection as Inline Code | Markdown Editor |
| `Ctrl + K` (in Editor) | Insert Link template | Markdown Editor |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

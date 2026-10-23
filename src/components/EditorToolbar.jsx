/**
 * EditorToolbar.jsx
 * Formatting toolbar for the Markdown editor.
 * Wraps selected text with Markdown syntax or inserts snippets at cursor.
 */

const tools = [
  { id: 'bold',       title: 'Bold (Ctrl+B)',       wrap: ['**', '**'],         placeholder: 'bold text',   icon: 'B',    mono: false },
  { id: 'italic',     title: 'Italic (Ctrl+I)',      wrap: ['*', '*'],           placeholder: 'italic text', icon: 'I',    mono: false },
  { id: 'strike',     title: 'Strikethrough',        wrap: ['~~', '~~'],         placeholder: 'text',        icon: 'S̶',    mono: false },
  { id: 'code-inline',title: 'Inline code',          wrap: ['`', '`'],           placeholder: 'code',        icon: '</>',  mono: true },
  { id: 'sep1', sep: true },
  { id: 'h1',         title: 'Heading 1',            prefix: '# ',               icon: 'H1',  mono: true },
  { id: 'h2',         title: 'Heading 2',            prefix: '## ',              icon: 'H2',  mono: true },
  { id: 'h3',         title: 'Heading 3',            prefix: '### ',             icon: 'H3',  mono: true },
  { id: 'sep2', sep: true },
  { id: 'ul',         title: 'Unordered list',       prefix: '- ',               icon: '≡',   mono: false },
  { id: 'ol',         title: 'Ordered list',         prefix: '1. ',              icon: '1.',  mono: true },
  { id: 'task',       title: 'Task item',            prefix: '- [ ] ',           icon: '☑',   mono: false },
  { id: 'blockquote', title: 'Blockquote',           prefix: '> ',               icon: '❝',   mono: false },
  { id: 'sep3', sep: true },
  { id: 'link',       title: 'Link',                 snippet: '[label](url)',     icon: '🔗',  mono: false },
  { id: 'image',      title: 'Image',                snippet: '![alt](url)',      icon: '🖼',   mono: false },
  { id: 'codeblock',  title: 'Code block',           snippet: '```js\n\n```',     icon: '{ }', mono: true },
  { id: 'table',      title: 'Table',                snippet: '| Col 1 | Col 2 |\n| ----- | ----- |\n| Cell  | Cell  |', icon: '⊞', mono: false },
  { id: 'hr',         title: 'Horizontal rule',      snippet: '\n---\n',          icon: '—',   mono: false },
]

function applyFormat(tool, textarea) {
  const { selectionStart: start, selectionEnd: end, value } = textarea
  const selected = value.slice(start, end)
  let before, insert, after, cursorStart, cursorEnd

  if (tool.wrap) {
    const [open, close] = tool.wrap
    insert = selected || tool.placeholder
    before = value.slice(0, start)
    after  = value.slice(end)
    const result = before + open + insert + close + after
    cursorStart = start + open.length
    cursorEnd   = cursorStart + insert.length
    return { result, cursorStart, cursorEnd }
  }

  if (tool.prefix) {
    // Apply prefix to each selected line
    const lines  = selected ? selected.split('\n') : ['']
    const prefixed = lines.map(l => tool.prefix + l).join('\n')
    before = value.slice(0, start)
    after  = value.slice(end)
    const result = before + prefixed + after
    cursorStart = start + tool.prefix.length
    cursorEnd   = start + prefixed.length
    return { result, cursorStart, cursorEnd }
  }

  if (tool.snippet) {
    before = value.slice(0, start)
    after  = value.slice(end)
    const result = before + tool.snippet + after
    cursorStart = cursorEnd = start + tool.snippet.length
    return { result, cursorStart, cursorEnd }
  }

  return null
}

export default function EditorToolbar({ textareaRef, onContentChange }) {
  const handleTool = (tool) => {
    const ta = textareaRef.current
    if (!ta) return
    const res = applyFormat(tool, ta)
    if (!res) return
    onContentChange(res.result)
    // Restore focus + selection after React re-render
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(res.cursorStart, res.cursorEnd)
    })
  }

  return (
    <div
      role="toolbar"
      aria-label="Markdown formatting toolbar"
      className="
        flex items-center gap-0.5 px-3 py-2
        border-b border-slate-200 dark:border-slate-700/60
        bg-slate-50 dark:bg-[#15182200]
        overflow-x-auto scrollbar-none flex-wrap
      "
    >
      {tools.map((tool) =>
        tool.sep ? (
          <div key={tool.id} className="w-px h-5 mx-1.5 bg-slate-200 dark:bg-slate-700 flex-shrink-0" aria-hidden="true" />
        ) : (
          <button
            key={tool.id}
            id={`toolbar-${tool.id}`}
            title={tool.title}
            aria-label={tool.title}
            onClick={() => handleTool(tool)}
            className={`
              px-2.5 py-1.5 rounded-md text-xs flex-shrink-0
              transition-colors duration-150
              text-slate-600 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-700
              hover:text-slate-900 dark:hover:text-slate-100
              ${tool.mono ? 'font-mono font-semibold' : 'font-medium'}
            `}
          >
            {tool.icon}
          </button>
        )
      )}
    </div>
  )
}

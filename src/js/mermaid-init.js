/* global mermaid */
(function () {
  function normalizeMermaidText (input) {
    // Normalize line endings and remove NBSP
    const raw = String(input || '')
      .replace(/\r\n/g, '\n')
      .replace(/\u00A0/g, ' ')
      .replace(/\t/g, '    ')

    const lines = raw.split('\n')

    // Remove leading/trailing empty lines
    while (lines.length && lines[0].trim() === '') lines.shift()
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop()

    // Compute common left indentation (ignoring empty lines)
    let minIndent = null
    for (const line of lines) {
      if (line.trim() === '') continue
      const m = line.match(/^(\s+)/)
      const indent = m ? m[1].length : 0
      if (minIndent === null || indent < minIndent) minIndent = indent
      if (minIndent === 0) break
    }

    if (minIndent && minIndent > 0) {
      return lines.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l)).join('\n')
    }
    return lines.join('\n')
  }

  function toMermaidDivs () {
    const pres = document.querySelectorAll('.literalblock.mermaid .content > pre')

    pres.forEach((pre) => {
      const src = normalizeMermaidText(pre.textContent)

      const inner = document.createElement('div')
      inner.className = 'mermaid'
      inner.textContent = src

      // Wrapper stays even after Mermaid replaces inner with SVG
      const wrapper = document.createElement('div')
      wrapper.className = 'mermaid-wrapper'

      // Store source for debugging (base64; survives newlines/special chars)
      wrapper.dataset.mermaidSource = encodeURIComponent(src)

      wrapper.appendChild(inner)

      const literalBlock = pre.closest('.literalblock')
      literalBlock.replaceWith(wrapper)
    })
  }

  function initMermaid () {
    if (!window.mermaid) return

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
    })

    toMermaidDivs()
    mermaid.run({ querySelector: '.mermaid' })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMermaid)
  } else {
    initMermaid()
  }
})()

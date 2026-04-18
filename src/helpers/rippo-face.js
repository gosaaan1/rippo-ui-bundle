'use strict'

const RAW = {
  standard:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="60" fill="none" stroke="#7BB8D9" stroke-width="0.6" opacity="0.3"/>' +
    '<circle cx="64" cy="64" r="38" fill="none" stroke="#7BB8D9" stroke-width="3" opacity="1"/>' +
    '<circle cx="51" cy="58" r="6" fill="#2C3E50"/>' +
    '<circle cx="77" cy="58" r="6" fill="#2C3E50"/>' +
    '<circle cx="53" cy="55" r="2" fill="#FFFFFF"/>' +
    '<circle cx="79" cy="55" r="2" fill="#FFFFFF"/>' +
    '<ellipse cx="40" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.7"/>' +
    '<ellipse cx="88" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.7"/>' +
    '<path d="M54 75 Q64 82 74 75" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '</svg>',
  excited:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="64" fill="none" stroke="#5A9BC4" stroke-width="0.8" opacity="0.45"/>' +
    '<circle cx="64" cy="64" r="40" fill="none" stroke="#5A9BC4" stroke-width="3.5" opacity="1"/>' +
    '<path d="M44 47 Q51 40 58 47" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M70 47 Q77 40 84 47" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<circle cx="51" cy="60" r="7" fill="#2C3E50"/>' +
    '<circle cx="77" cy="60" r="7" fill="#2C3E50"/>' +
    '<circle cx="53" cy="57" r="2.5" fill="#FFFFFF"/>' +
    '<circle cx="79" cy="57" r="2.5" fill="#FFFFFF"/>' +
    '<ellipse cx="38" cy="78" rx="9" ry="5.5" fill="#F4B8B8" opacity="0.9"/>' +
    '<ellipse cx="90" cy="78" rx="9" ry="5.5" fill="#F4B8B8" opacity="0.9"/>' +
    '<path d="M48 78 Q64 96 80 78" fill="none" stroke="#2C3E50" stroke-width="3" stroke-linecap="round"/>' +
    '</svg>',
  focused:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="48" fill="none" stroke="#7A8B9C" stroke-width="0.6" opacity="0.35"/>' +
    '<circle cx="64" cy="64" r="32" fill="none" stroke="#7A8B9C" stroke-width="3" opacity="1"/>' +
    '<path d="M42 50 L60 56" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M86 50 L68 56" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M44 62 L60 62" stroke="#2C3E50" stroke-width="3.5" stroke-linecap="round"/>' +
    '<path d="M68 62 L84 62" stroke="#2C3E50" stroke-width="3.5" stroke-linecap="round"/>' +
    '<path d="M54 78 L74 78" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '</svg>',
  idea:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="64" fill="none" stroke="#F4D35E" stroke-width="0.8" opacity="0.5"/>' +
    '<circle cx="64" cy="64" r="40" fill="none" stroke="#F4D35E" stroke-width="3.5" opacity="1"/>' +
    '<path d="M44 47 Q51 40 58 47" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M70 47 Q77 40 84 47" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<circle cx="51" cy="60" r="7" fill="#2C3E50"/>' +
    '<circle cx="77" cy="60" r="7" fill="#2C3E50"/>' +
    '<circle cx="53" cy="57" r="2.5" fill="#FFFFFF"/>' +
    '<circle cx="79" cy="57" r="2.5" fill="#FFFFFF"/>' +
    '<ellipse cx="38" cy="78" rx="9" ry="5.5" fill="#F4B8B8" opacity="0.9"/>' +
    '<ellipse cx="90" cy="78" rx="9" ry="5.5" fill="#F4B8B8" opacity="0.9"/>' +
    '<ellipse cx="64" cy="82" rx="11" ry="7" fill="#2C3E50"/>' +
    '</svg>',
  done:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="62" fill="none" stroke="#6FB58C" stroke-width="0.8" opacity="0.45"/>' +
    '<circle cx="64" cy="64" r="40" fill="none" stroke="#6FB58C" stroke-width="3.3" opacity="1"/>' +
    '<path d="M44 47 Q51 42 58 47" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M70 47 Q77 42 84 47" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<circle cx="51" cy="60" r="6.5" fill="#2C3E50"/>' +
    '<circle cx="77" cy="60" r="6.5" fill="#2C3E50"/>' +
    '<circle cx="53" cy="57" r="2.3" fill="#FFFFFF"/>' +
    '<circle cx="79" cy="57" r="2.3" fill="#FFFFFF"/>' +
    '<ellipse cx="38" cy="78" rx="8" ry="5" fill="#F4B8B8" opacity="0.85"/>' +
    '<ellipse cx="90" cy="78" rx="8" ry="5" fill="#F4B8B8" opacity="0.85"/>' +
    '<path d="M50 78 Q64 92 78 78" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '</svg>',
  proposing:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="60" fill="none" stroke="#4FB3A9" stroke-width="0.7" opacity="0.4"/>' +
    '<circle cx="64" cy="64" r="38" fill="none" stroke="#4FB3A9" stroke-width="3" opacity="1"/>' +
    '<path d="M44 48 Q51 43 58 48" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M70 48 Q77 43 84 48" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<circle cx="51" cy="60" r="6" fill="#2C3E50"/>' +
    '<circle cx="77" cy="60" r="6" fill="#2C3E50"/>' +
    '<circle cx="53" cy="57" r="2" fill="#FFFFFF"/>' +
    '<circle cx="79" cy="57" r="2" fill="#FFFFFF"/>' +
    '<ellipse cx="40" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.7"/>' +
    '<ellipse cx="88" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.7"/>' +
    '<path d="M54 75 Q64 82 74 75" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '</svg>',
  confused:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="58" fill="none" stroke="#A894C4" stroke-width="0.6" opacity="0.3" stroke-dasharray="4 3"/>' +
    '<circle cx="64" cy="64" r="38" fill="none" stroke="#A894C4" stroke-width="3" opacity="1" stroke-dasharray="4 3"/>' +
    '<path d="M42 48 Q52 54 62 49" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M66 49 Q76 54 86 48" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<circle cx="52" cy="60" r="5.5" fill="#2C3E50"/>' +
    '<circle cx="76" cy="60" r="5.5" fill="#2C3E50"/>' +
    '<circle cx="54" cy="58" r="1.8" fill="#FFFFFF"/>' +
    '<circle cx="78" cy="58" r="1.8" fill="#FFFFFF"/>' +
    '<ellipse cx="40" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.7"/>' +
    '<ellipse cx="88" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.7"/>' +
    '<path d="M52 82 Q64 74 76 82" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '</svg>',
  attention:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="60" fill="none" stroke="#E89556" stroke-width="0.8" opacity="0.4"/>' +
    '<circle cx="64" cy="64" r="38" fill="none" stroke="#E89556" stroke-width="3.2" opacity="1"/>' +
    '<path d="M42 48 Q50 52 58 48" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M70 48 Q78 52 86 48" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<circle cx="51" cy="60" r="6" fill="#2C3E50"/>' +
    '<circle cx="77" cy="60" r="6" fill="#2C3E50"/>' +
    '<circle cx="53" cy="57" r="2" fill="#FFFFFF"/>' +
    '<circle cx="79" cy="57" r="2" fill="#FFFFFF"/>' +
    '<path d="M54 80 Q64 74 74 80" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '</svg>',
  sorry:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="56" fill="none" stroke="#D99BAD" stroke-width="0.6" opacity="0.35"/>' +
    '<circle cx="64" cy="64" r="36" fill="none" stroke="#D99BAD" stroke-width="2.8" opacity="1"/>' +
    '<path d="M42 52 Q52 58 62 53" fill="none" stroke="#2C3E50" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M66 53 Q76 58 86 52" fill="none" stroke="#2C3E50" stroke-width="2.6" stroke-linecap="round"/>' +
    '<circle cx="52" cy="63" r="5" fill="#2C3E50"/>' +
    '<circle cx="76" cy="63" r="5" fill="#2C3E50"/>' +
    '<path d="M54 80 Q64 76 74 80" fill="none" stroke="#2C3E50" stroke-width="2.6" stroke-linecap="round"/>' +
    '</svg>',
  sleepy:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">' +
    '<circle cx="64" cy="64" r="50" fill="none" stroke="#B8D4E3" stroke-width="0.5" opacity="0.3"/>' +
    '<circle cx="64" cy="64" r="32" fill="none" stroke="#B8D4E3" stroke-width="2.2" opacity="0.95"/>' +
    '<path d="M42 62 Q51 58 60 62" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<path d="M68 62 Q77 58 86 62" fill="none" stroke="#2C3E50" stroke-width="2.8" stroke-linecap="round"/>' +
    '<ellipse cx="40" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.5"/>' +
    '<ellipse cx="88" cy="74" rx="7" ry="4" fill="#F4B8B8" opacity="0.5"/>' +
    '<ellipse cx="64" cy="80" rx="5" ry="3" fill="#2C3E50"/>' +
    '<text x="95" y="32" font-family="sans-serif" font-size="14" font-weight="500" fill="#B8D4E3">z</text>' +
    '<text x="101" y="24" font-family="sans-serif" font-size="11" font-weight="500" fill="#B8D4E3">z</text>' +
    '</svg>',
}

const PREAMBLE = '<svg class="rippo-avatar-svg" role="img" aria-hidden="true" '
const SVG_BY_MOOD = {}
Object.keys(RAW).forEach((mood) => {
  SVG_BY_MOOD[mood] = RAW[mood]
    .replace(/#2C3E50/g, 'currentColor')
    .replace('<svg ', PREAMBLE)
})

module.exports = (mood) => {
  const key = String(mood || 'standard').toLowerCase().trim()
  return SVG_BY_MOOD[key] || SVG_BY_MOOD.standard
}

'use strict'

module.exports = (raw) => {
  if (!raw) return []
  return String(raw)
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
}

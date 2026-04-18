'use strict'

const LABELS = {
  standard: '標準',
  excited: 'わくわく',
  focused: '集中',
  idea: 'ひらめき',
  done: '完了',
  proposing: '提案',
  confused: '困惑',
  attention: '注意',
  sorry: '恐縮',
  sleepy: '眠い',
}

module.exports = (mood) => {
  const key = String(mood || 'standard').toLowerCase().trim()
  return LABELS[key] || LABELS.standard
}

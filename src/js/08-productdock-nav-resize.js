/* global window document */

(function () {
  'use strict'

  const STORAGE_MODE_KEY = 'productdock.navWidth.mode' // 'auto' | 'manual'
  const STORAGE_MANUAL_KEY = 'productdock.navWidth.manualPx'
  const STORAGE_LAST_AUTO_KEY = 'productdock.navWidth.lastAutoPx'

  const DEFAULT_MODE = 'auto'

  // Granice (px) – po potrebi kasnije dotjeramo
  const MIN_PX = 240
  const MAX_PX = 560

  // Koliko “lufta” dodati na najdužu stavku (px)
  const EXTRA_PADDING = 64

  // Koliko mala razlika se ignoriše (da se ne vidi “skok” bezveze)
  const APPLY_EPSILON_PX = 12

  function clamp (n, min, max) {
    return Math.min(max, Math.max(min, n))
  }

  function $ (sel, root) {
    return (root || document).querySelector(sel)
  }

  function $all (sel, root) {
    return Array.from((root || document).querySelectorAll(sel))
  }

  function safeGetLS (key) {
    try {
      return window.localStorage.getItem(key)
    } catch (e) {
      return null
    }
  }

  function safeSetLS (key, val) {
    try {
      window.localStorage.setItem(key, String(val))
    } catch (e) {
      // ignore
    }
  }

  function getMode () {
    const m = safeGetLS(STORAGE_MODE_KEY)
    return (m === 'manual' || m === 'auto') ? m : DEFAULT_MODE
  }

  function setMode (mode) {
    safeSetLS(STORAGE_MODE_KEY, mode)
  }

  function setCssNavWidthPx (px) {
    const v = clamp(px, MIN_PX, MAX_PX)
    document.documentElement.style.setProperty('--nav-width', v + 'px')
  }

  function getCssNavWidthPx () {
    const v = window.getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim()
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : null
  }

  // ---------------------------
  // 0) APPLY ASAP (bez čekanja DOMContentLoaded)
  // Cilj: da nema “prvo jedna širina pa onda skok”.
  // ---------------------------
  ;(function applyInitialWidthAsap () {
    const mode = getMode()

    if (mode === 'manual') {
      const manual = parseInt(safeGetLS(STORAGE_MANUAL_KEY), 10)
      if (Number.isFinite(manual)) setCssNavWidthPx(manual)
      return
    }

    // mode === 'auto'
    const lastAuto = parseInt(safeGetLS(STORAGE_LAST_AUTO_KEY), 10)
    if (Number.isFinite(lastAuto)) setCssNavWidthPx(lastAuto)
    // ako nema lastAuto, ostavi default iz CSS-a (nema skoka jer ništa ne diramo)
  })()

  // ---------------------------
  // AUTO: izračun idealne širine na osnovu nav teksta
  // ---------------------------
  function computeIdealWidthPx () {
    const navPanel = $('.nav-panel-menu')
    if (!navPanel) return null

    // Mjerimo “koliko je širok tekst” tako što uzmemo scrollWidth relevantnih elemenata.
    // Fokus: linkovi i tekst u nav-u.
    const candidates = $all('.nav-link, .nav-text', navPanel)
    if (!candidates.length) return null

    let max = 0
    candidates.forEach((el) => {
      // scrollWidth radi i kad je line-wrap; daje “koliki bi bio bez wrap-a”
      const w = el.scrollWidth
      if (w > max) max = w
    })

    if (!max) return null

    // + padding za indent, toggle, scrollbar, itd
    return max + EXTRA_PADDING
  }

  let autoTimer = null
  function scheduleAutoApply (delayMs) {
    if (autoTimer) window.clearTimeout(autoTimer)
    autoTimer = window.setTimeout(() => {
      autoTimer = null
      applyAutoIfAllowed()
    }, delayMs)
  }

  function applyAutoIfAllowed () {
    const mode = getMode()
    if (mode === 'manual') return

    const ideal = computeIdealWidthPx()
    if (ideal == null) return

    const px = clamp(ideal, MIN_PX, MAX_PX)

    // Ne mijenjaj ako je razlika mala (da smanjimo “vidljivo skakanje”)
    const current = getCssNavWidthPx()
    if (current != null && Math.abs(current - px) < APPLY_EPSILON_PX) {
      safeSetLS(STORAGE_LAST_AUTO_KEY, Math.round(current))
      return
    }

    setCssNavWidthPx(px)
    safeSetLS(STORAGE_LAST_AUTO_KEY, Math.round(px))
  }

  // ---------------------------
  // MANUAL: drag handle
  // ---------------------------
  function ensureResizeHandle () {
    const navContainer = $('.nav-container')
    if (!navContainer) return

    let handle = $('.pd-nav-resize-handle', navContainer)
    if (!handle) {
      handle = document.createElement('div')
      handle.className = 'pd-nav-resize-handle'
      navContainer.appendChild(handle)
    }

    // Bitno: ne oslanjamo se 100% na CSS (da ne “nestane” handle)
    // Ovo garantuje da se može “ubosti mišem”.
    handle.style.position = 'absolute'
    handle.style.top = '0'
    handle.style.right = '-4px'
    handle.style.height = '100%'
    handle.style.width = '10px'
    handle.style.cursor = 'col-resize'
    handle.style.zIndex = '999'
    handle.style.userSelect = 'none'
    handle.style.touchAction = 'none'

    let dragging = false
    let startX = 0
    let startWidth = 0

    function onMove (e) {
      if (!dragging) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const dx = clientX - startX
      const next = clamp(startWidth + dx, MIN_PX, MAX_PX)
      setCssNavWidthPx(next)
    }

    function stop () {
      if (!dragging) return
      dragging = false
      document.documentElement.classList.remove('pd-nav-resizing')

      const finalPx = getCssNavWidthPx()
      if (finalPx != null) {
        setMode('manual')
        safeSetLS(STORAGE_MANUAL_KEY, Math.round(finalPx))
      }

      window.removeEventListener('mousemove', onMove, true)
      window.removeEventListener('mouseup', stop, true)
      window.removeEventListener('touchmove', onMove, { capture: true })
      window.removeEventListener('touchend', stop, true)
      window.removeEventListener('touchcancel', stop, true)
    }

    function start (e) {
      // Ne dozvoli da klik na link u nav-u pokrene drag
      e.preventDefault()
      e.stopPropagation()

      dragging = true
      document.documentElement.classList.add('pd-nav-resizing')

      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      startX = clientX

      const current = getCssNavWidthPx()
      startWidth = (current != null) ? current : navContainer.getBoundingClientRect().width

      window.addEventListener('mousemove', onMove, true)
      window.addEventListener('mouseup', stop, true)
      window.addEventListener('touchmove', onMove, { capture: true, passive: false })
      window.addEventListener('touchend', stop, true)
      window.addEventListener('touchcancel', stop, true)
    }

    handle.addEventListener('mousedown', start)
    handle.addEventListener('touchstart', start, { passive: false })
  }

  // ---------------------------
  // Start (poslije DOM ready)
  // ---------------------------
  function init () {
    ensureResizeHandle()

    // Auto: uradi jednom kad je DOM spreman, pa još jednom kratko kasnije
    // (ali samo 1 “late” pokušaj, ne 3 – da izbjegnemo ružan skok)
    scheduleAutoApply(0)
    scheduleAutoApply(200)

    // Reaguj na promjene u nav-u (npr. expand/collapse, promjena verzije, itd.)
    const navPanel = $('.nav-panel-menu')
    if (navPanel && 'MutationObserver' in window) {
      const obs = new window.MutationObserver(() => {
        if (getMode() === 'auto' && !document.documentElement.classList.contains('pd-nav-resizing')) {
          scheduleAutoApply(80)
        }
      })
      obs.observe(navPanel, { childList: true, subtree: true, characterData: true })
    }

    // Reaguj na resize prozora samo u auto modu
    window.addEventListener('resize', () => {
      if (getMode() === 'auto') scheduleAutoApply(120)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

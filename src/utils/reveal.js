const elements = new Map()
let frame = null
let listening = false

function update() {
  frame = null
  const height = window.innerHeight
  const updates = []
  for (const [element, options] of elements) {
    const rect = element.getBoundingClientRect()
    // Calculate against the element's untransformed position, so the effect
    // does not feed back into its own scroll progress.
    const top = rect.top - options.offsetY - rect.height * (1 / options.scale - 1) / 2
    const progress = Math.max(0, Math.min(1, (height * 0.94 - top) / (height * 0.38)))
    if (progress === options.progress) continue
    const remaining = 1 - progress
    const x = options.direction === 'left' ? -75 * remaining : options.direction === 'right' ? 75 * remaining : 0
    const y = options.direction === 'up' ? 55 * remaining : options.direction === 'zoom' ? 30 * remaining : 0
    const scale = 1 - (options.direction === 'zoom' ? 0.12 : 0.03) * remaining
    options.offsetY = y
    options.scale = scale
    options.progress = progress
    updates.push({ element, x, y, scale, progress })
  }
  // Finish every layout read before writing styles to avoid repeated reflow.
  for (const { element, x, y, scale, progress } of updates) {
    element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    element.style.opacity = progress
  }
}

function schedule() {
  if (frame === null) frame = requestAnimationFrame(update)
}

export const reveal = {
  mounted(element, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const options = typeof binding.value === 'object' && binding.value !== null ? binding.value : {}
    const direction = ['left', 'right', 'up', 'zoom'].includes(options.from) ? options.from : 'up'
    elements.set(element, { direction, offsetY: 0, scale: 1, progress: null })
    element.classList.add('scroll-reveal')
    if (!listening) {
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
      listening = true
    }
    schedule()
  },
  beforeUnmount(element) {
    elements.delete(element)
    if (!elements.size && listening) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      listening = false
    }
  }
}

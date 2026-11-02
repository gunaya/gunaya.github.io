<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { profile, links, about } from '../data/portfolio.js'
import { breakPhotos } from '../utils/photos.js'
import { photoDescriptions } from '../data/photo-descriptions.js'

const count = breakPhotos.length
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const FLY_MS = 700
const SETTLE_MS = 450
const PULL = 0.25
const TEAR_AT = 8

const start = Math.max(breakPhotos.findIndex((photo) => photo.filename === 'DSCF0797.JPG'), 0)
const idx = ref(start)
const phase = ref('idle')
const torn = ref(false)
const offset = reactive({ x: 0, y: 0 })
const edge = ref(makeEdge())
const stage = ref(null)
const timers = []
let drag = null

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
const today = new Date()
function monthOf(i) {
  const ahead = (i - start + count) % count
  return monthFormat.format(new Date(today.getFullYear(), today.getMonth() + ahead, 1))
}

const current = computed(() => breakPhotos[idx.value])
const next = computed(() => breakPhotos[(idx.value + 1) % count])
const currentMonth = computed(() => monthOf(idx.value))
const nextMonth = computed(() => monthOf((idx.value + 1) % count))
const description = computed(() => photoDescriptions[current.value.filename])

const stillStyle = computed(() => ({ clipPath: torn.value ? edge.value.strip : 'none' }))
const flapStyle = computed(() => {
  if (!torn.value) return {}
  const transform = phase.value === 'flying'
    ? `translate(${offset.x}px, 130%) rotate(${offset.x * 0.04 + 4}deg)`
    : `translate(${offset.x}px, ${offset.y}px) rotate(${offset.x * 0.04}deg)`
  return { clipPath: edge.value.body, background: 'var(--sheet)', transform }
})
const photoStyle = computed(() => ({ clipPath: torn.value ? edge.value.bodyPhoto : 'none' }))

function makeEdge() {
  const n = 28
  const pts = Array.from({ length: n + 1 }, (_, i) => ({
    x: ((i / n) * 100).toFixed(2),
    y: TEAR_AT + (Math.random() - 0.5) * 3,
  }))
  const seam = (dy) => pts.map((p) => `${p.x}% ${(p.y + dy).toFixed(2)}%`)
  return {
    strip: `polygon(0 0, 100% 0, ${seam(0).reverse().join(', ')})`,
    body: `polygon(${seam(0).join(', ')}, 100% 100%, 0 100%)`,
    bodyPhoto: `polygon(${seam(2).join(', ')}, 100% 100%, 0 100%)`,
  }
}

function later(fn, ms) {
  timers.push(setTimeout(fn, ms))
}

function onGrab(e) {
  if (phase.value !== 'idle') return
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY, ddy: 0 }
  if (!reduce) {
    edge.value = makeEdge()
    phase.value = 'dragging'
  }
  try {
    stage.value.setPointerCapture(e.pointerId)
  } catch {
    // Capture can fail for synthetic pointers; pointermove still reaches the stage.
  }
}

function onMove(e) {
  if (!drag || e.pointerId !== drag.id) return
  drag.ddy = e.clientY - drag.y
  if (reduce) return
  if (drag.ddy > 8) torn.value = true
  if (!torn.value) return
  offset.x = (e.clientX - drag.x) * 0.25
  offset.y = Math.max(0, drag.ddy)
}

function onRelease(e) {
  if (!drag || e.pointerId !== drag.id) return
  const { ddy } = drag
  drag = null
  const h = stage.value.getBoundingClientRect().height
  const pulled = Math.max(0, ddy) >= h * PULL
  if (reduce) {
    if (pulled) idx.value = (idx.value + 1) % count
    return
  }
  if (!torn.value) {
    phase.value = 'idle'
    return
  }
  if (pulled) fling()
  else settle()
}

function onCancel() {
  if (!drag) return
  drag = null
  if (torn.value) settle()
  else phase.value = 'idle'
}

function settle() {
  offset.x = 0
  offset.y = 0
  phase.value = 'settling'
  later(() => {
    torn.value = false
    phase.value = 'idle'
  }, SETTLE_MS)
}

function fling() {
  phase.value = 'flying'
  later(land, FLY_MS)
}

function land() {
  idx.value = (idx.value + 1) % count
  offset.x = 0
  offset.y = 0
  torn.value = false
  phase.value = 'snapping'
  requestAnimationFrame(() => requestAnimationFrame(() => {
    phase.value = 'idle'
  }))
}

function onKey(e) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowRight') return
  if (phase.value !== 'idle') return
  e.preventDefault()
  if (reduce) {
    idx.value = (idx.value + 1) % count
    return
  }
  edge.value = makeEdge()
  torn.value = true
  fling()
}

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <section id="home" class="hero-room frame flex min-h-[calc(100svh-4rem)] items-center py-16">
    <div class="hero-card sheet-card sheet-scallop mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-12 lg:gap-8">

      <div class="lg:col-span-7">
        <h1 class="font-display text-display" data-reveal style="--d: 300ms">I Wayan Gunaya</h1>
        <p class="text-lead mt-8 max-w-[30ch]" data-reveal style="--d: 420ms">{{ profile.summary }}</p>
        <dl class="mt-10 flex flex-wrap gap-x-12 gap-y-6" data-reveal style="--d: 500ms">
          <div v-for="stat in about.highlights" :key="stat.label" class="flex flex-col-reverse">
            <dt class="text-small text-muted">{{ stat.label }}</dt>
            <dd class="font-display text-stat">{{ stat.value }}</dd>
          </div>
        </dl>
        <a href="#contact" class="button mt-10" data-reveal style="--d: 620ms">Get in touch</a>
      </div>

      <figure class="lg:col-span-5" data-reveal style="--d: 480ms">
        <div
          ref="stage"
          class="tear-stage relative aspect-[4/5] w-full touch-none select-none"
          :class="{ 'is-dragging': phase === 'dragging', 'is-flying': phase === 'flying', 'is-snapping': phase === 'snapping' }"
          tabindex="0"
          role="group"
          :aria-label="`Calendar page for ${currentMonth}. Drag it down, or press the down arrow key, to tear it off to ${nextMonth}.`"
          @pointerdown="onGrab"
          @pointermove="onMove"
          @pointerup="onRelease"
          @pointercancel="onCancel"
          @keydown="onKey"
          @dragstart.prevent>
          <div class="tear-sheet tear-under" aria-hidden="true">
            <img :src="next.src" alt="" draggable="false" class="tear-photo" />
          </div>
          <div class="tear-sheet tear-still" :style="stillStyle">
            <img :src="current.src" :alt="description" draggable="false" class="tear-photo" />
          </div>
          <div class="tear-sheet tear-flap" :style="flapStyle" aria-hidden="true">
            <img :src="current.src" alt="" draggable="false" class="tear-photo" :style="photoStyle" />
          </div>
        </div>
        <figcaption class="text-small mt-3 text-muted">{{ description }}</figcaption>
      </figure>

      <div class="perf lg:col-span-12" aria-hidden="true"></div>

      <div class="text-small flex flex-wrap items-center justify-between gap-x-8 gap-y-3 lg:col-span-12">
        <ul class="flex flex-wrap gap-x-8 gap-y-2">
          <li><a :href="links.github" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">GitHub</a></li>
          <li><a :href="links.linkedin" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">LinkedIn</a></li>
          <li><a :href="links.instagram" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">Instagram</a></li>
        </ul>
        <p class="text-muted">{{ profile.location }}</p>
      </div>
    </div>
  </section>
</template>

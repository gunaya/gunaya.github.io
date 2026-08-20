<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const modules = import.meta.glob('../assets/img/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,avif}', {
  eager: true,
  import: 'default',
})

const photos = Object.entries(modules).map(([path, src]) => {
  const name = path.split('/').pop().replace(/\.[^.]+$/, '')
  return { src, name: name.replace(/[-_]+/g, ' ') }
})

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const photosShuffled = shuffle(photos)

const index = ref(0)
const selected = computed(() => (photosShuffled.length ? photosShuffled[index.value] : null))
const selectedOpen = ref(false)

function show(i) {
  index.value = i
  selectedOpen.value = true
}
function close() {
  selectedOpen.value = false
}
function prev() {
  index.value = (index.value - 1 + photosShuffled.length) % photosShuffled.length
}
function next() {
  index.value = (index.value + 1) % photosShuffled.length
}

function onKey(e) {
  if (!selectedOpen.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section id="photography" class="scroll-mt-16 py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Photography</h2>
        <div class="mt-3 h-1 w-16 rounded-full bg-accent-500"></div>
        <p class="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
          A few shots I've taken myself.
        </p>
      </div>

      <div v-if="photosShuffled.length" class="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <button
          v-for="(photo, i) in photosShuffled"
          :key="photo.src"
          type="button"
          class="group mb-4 block w-full overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg dark:border-slate-800"
          @click="show(i)"
        >
          <img
            :src="photo.src"
            :alt="photo.name"
            loading="lazy"
            class="w-full transition duration-500 group-hover:scale-105"
          />
        </button>
      </div>
      <p v-else class="text-slate-500 dark:text-slate-400">
        No photos yet — drop some images into <code class="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">src/assets/img</code>.
      </p>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedOpen && selected"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        @click="close"
      >
        <button
          type="button"
          class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Close"
          @click.stop="close"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          v-if="photosShuffled.length > 1"
          type="button"
          class="absolute left-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Previous"
          @click.stop="prev"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          v-if="photosShuffled.length > 1"
          type="button"
          class="absolute right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          aria-label="Next"
          @click.stop="next"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <figure class="max-h-full max-w-4xl" @click.stop>
          <img
            :src="selected.src"
            :alt="selected.name"
            class="max-h-[80vh] w-auto rounded-lg object-contain"
          />
          <figcaption class="mt-3 text-center text-sm text-slate-300">
            {{ selected.name }} · {{ index + 1 }} / {{ photosShuffled.length }}
          </figcaption>
        </figure>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { sections } from '../data/portfolio.js'

defineProps({
  isDark: Boolean,
})
defineEmits(['toggle-theme'])

const active = ref('home')
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
  const pos = window.scrollY + 120
  let current = 'home'
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el && el.offsetTop <= pos) current = s.id
  }
  active.value = current
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-colors"
    :class="scrolled
      ? 'border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80'
      : 'border-transparent bg-transparent'"
  >
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <a href="#home" class="text-lg font-bold tracking-tight">
        <span class="text-accent-600 dark:text-accent-400">gunaya</span>.dev
      </a>

      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="active === s.id
            ? 'text-accent-600 dark:text-accent-400'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
        >
          {{ s.label }}
        </a>

        <button
          type="button"
          aria-label="Toggle theme"
          class="ml-3 rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          @click="$emit('toggle-theme')"
        >
          <svg v-if="isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364 6.364l-1.061-1.061M6.696 6.696l-1.06-1.06m12.728 0l-1.061 1.06M6.696 17.304l-1.06 1.06M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        aria-label="Toggle menu"
        class="rounded-lg p-2 text-slate-600 dark:text-slate-400 md:hidden"
        @click="menuOpen = !menuOpen"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div v-if="menuOpen" class="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
      <a
        v-for="s in sections"
        :key="s.id"
        :href="`#${s.id}`"
        class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        @click="menuOpen = false"
      >
        {{ s.label }}
      </a>
    </div>
  </header>
</template>

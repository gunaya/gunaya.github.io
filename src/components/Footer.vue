<script setup>
import { profile } from '../data/portfolio.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
      <p class="text-sm text-slate-500 dark:text-slate-400">
        © {{ year }} {{ profile.name }}. All rights reserved.
      </p>
      <a href="#home" class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-accent-400 hover:text-accent-600 dark:border-slate-700 dark:text-slate-400 dark:hover:text-accent-400">
        Back to top ↑
      </a>
    </div>
  </footer>
</template>

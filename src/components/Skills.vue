<script setup>
import { skillGroups } from '../data/portfolio.js'
</script>

<template>
  <section id="skills" class="scroll-mt-16 bg-slate-50 py-20 dark:bg-slate-900/40">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Skills</h2>
        <div class="mt-3 h-1 w-16 rounded-full bg-accent-500"></div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="group in skillGroups"
          :key="group.title"
          class="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
        >
          <h3 class="mb-4 text-lg font-semibold">{{ group.title }}</h3>
          <ul class="space-y-2">
            <li
              v-for="skill in group.skills"
              :key="skill"
              class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
            >
              <svg class="h-4 w-4 shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

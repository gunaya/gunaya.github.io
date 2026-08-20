<script setup>
import { about } from '../data/portfolio.js'
</script>

<template>
  <section id="about" class="scroll-mt-16 py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
        <div class="mt-3 h-1 w-16 rounded-full bg-accent-500"></div>
      </div>

      <div class="grid gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <p class="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {{ about.intro }}
          </p>

          <div class="mt-8">
            <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interests
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="i in about.interests"
                :key="i"
                class="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {{ i }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <div
            v-for="h in about.highlights"
            :key="h.label"
            class="rounded-2xl border border-slate-200 p-6 text-center transition hover:border-accent-400 dark:border-slate-800 dark:hover:border-accent-500"
          >
            <div class="text-3xl font-extrabold text-accent-600 dark:text-accent-400">
              {{ h.value }}
            </div>
            <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ h.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

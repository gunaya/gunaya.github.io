<script setup>
import { about, profile } from '../data/portfolio.js'
</script>

<template>
  <section id="about" class="scroll-mt-16 py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p class="section-label mb-4">01 / The person behind the work</p>
          <h2 class="section-title">A little more<br>about me<span class="text-accent-500">.</span></h2>
          <div class="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <span class="h-2 w-2 rounded-full bg-accent-500"></span> Based in {{ profile.location }}
          </div>
        </div>
        <div>
          <p class="text-xl leading-relaxed tracking-tight text-slate-700 sm:text-2xl dark:text-slate-300">{{ about.intro }}</p>
          <div class="mt-9 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h3 class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Things I'm curious about</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="interest in about.interests" :key="interest" class="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">{{ interest }}</span>
            </div>
          </div>
          <div class="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            <div v-for="highlight in about.highlights" :key="highlight.label" class="about-stat rounded-3xl p-5 sm:p-7">
              <span class="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{{ highlight.value }}</span>
              <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">{{ highlight.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

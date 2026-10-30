<script setup>
import { skillGroups } from '../data/portfolio.js'

const symbols = ['</>', '{ }', '◫', '◈', '⌘']
const descriptions = [
  'The building blocks behind the work.',
  'Reliable systems and connected services.',
  'Interfaces that bring ideas to life.',
  'Turning information into useful insights.',
  'The tools that keep everything moving.'
]
</script>

<template>
  <section id="skills" class="skills-surface scroll-mt-16 py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mb-12 grid gap-5 md:grid-cols-2 md:items-end md:gap-16">
        <div>
          <p class="section-label mb-4">02 / The toolkit</p>
          <h2 class="section-title">Good ideas need<br>the right tools<span class="text-accent-500">.</span></h2>
        </div>
        <p class="max-w-md leading-relaxed text-slate-600 md:justify-self-end dark:text-slate-400">From the first line of code to the finishing touches, here are some of the technologies I work with.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <article v-for="(group, index) in skillGroups" :key="group.title" class="skill-card group lg:col-span-2" :class="{ 'lg:col-span-3': index < 2 }">
          <div class="flex items-start justify-between gap-4">
            <span class="skill-icon" aria-hidden="true">{{ symbols[index] || '✳' }}</span>
            <span class="font-mono text-xs text-slate-400">{{ String(index + 1).padStart(2, '0') }} / {{ String(skillGroups.length).padStart(2, '0') }}</span>
          </div>
          <div class="mt-8">
            <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">{{ group.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ descriptions[index] || 'Tools and technologies I work with.' }}</p>
          </div>
          <ul class="mt-6 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5 dark:border-white/10">
            <li v-for="skill in group.skills" :key="skill" class="skill-tag">{{ skill }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

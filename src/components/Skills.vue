<script setup>
import { skillGroups } from '../data/portfolio.js'

function span(i) {
  if (i === 4) return 'md:col-span-2 xl:col-span-2'
  return i < 2 ? 'xl:col-span-3' : 'xl:col-span-2'
}
</script>

<template>
  <section id="skills" class="section scroll-mt-16 frame">
    <h2 class="h-section" data-reveal>Skills</h2>

    <div class="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
      <div v-for="(group, i) in skillGroups" :key="group.title" class="stub flex flex-col justify-between gap-8 p-8" :class="span(i)" data-reveal :style="{ '--d': i * 100 + 'ms' }">
        <ul class="flex flex-wrap gap-x-5 gap-y-2 font-display text-item">
          <li v-for="skill in group.skills" :key="skill" class="whitespace-nowrap">{{ skill }}</li>
        </ul>
        <h3 class="text-small font-medium text-muted">{{ group.title }}</h3>
      </div>
    </div>
  </section>
</template>

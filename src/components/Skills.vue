<script setup>
import { skillGroups } from '../data/portfolio.js'
</script>

<template>
  <section id="skills" class="frame scroll-mt-16 bg-surface py-28 sm:py-40">
    <h2 class="h-section max-w-[12ch] text-ink">Good ideas need the right tools.</h2>
    <p class="mt-8 max-w-[44ch] text-lg leading-relaxed text-ink">From the first line of code to the finishing touches, here are the technologies I work with.</p>

    <div class="mt-16">
      <article v-for="group in skillGroups" :key="group.title" class="py-10 first:pt-0">
        <h3 class="h-group text-ink">{{ group.title }}</h3>
        <p class="mt-4 text-xl leading-relaxed text-ink">{{ group.skills.join('  ·  ') }}</p>
      </article>
    </div>
  </section>
</template>

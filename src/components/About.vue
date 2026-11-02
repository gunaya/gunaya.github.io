<script setup>
import { about, profile } from '../data/portfolio.js'
</script>

<template>
  <section id="about" class="frame scroll-mt-16 py-28 sm:py-40">
    <div>
      <h2 class="h-section text-ink">About me.</h2>
      <p class="mt-10 max-w-[38ch] text-xl leading-relaxed text-ink sm:text-2xl">{{ about.intro }}</p>
      <p class="mt-6 text-base text-muted">Based in {{ profile.location }}</p>
    </div>

    <div class="mt-16 flex flex-col gap-12">
        <div v-for="highlight in about.highlights" :key="highlight.label">
          <p class="font-display text-[clamp(4rem,7vw,6.5rem)] font-bold leading-none tracking-[-0.04em] whitespace-nowrap text-accent">{{ highlight.value }}</p>
          <p class="mt-3 text-lg text-ink">{{ highlight.label }}</p>
        </div>
      </div>

    <ul class="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-lg text-ink">
      <li v-for="interest in about.interests" :key="interest">{{ interest }}</li>
    </ul>
  </section>
</template>

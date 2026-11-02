<script setup>
import { about, profile } from '../data/portfolio.js'
</script>

<template>
  <section id="about" class="section scroll-mt-16 frame">
    <h2 class="h-section" data-reveal>About</h2>
    <p class="statement mt-10" data-reveal style="--d: 120ms">{{ about.statement }}</p>
    <div class="mt-14 grid gap-12 md:grid-cols-2 md:gap-16" data-reveal style="--d: 240ms">
      <p class="text-body">{{ about.intro }}</p>
      <div class="text-body flex flex-col gap-4">
        <p>Based in {{ profile.location }}</p>
        <ul class="text-small flex flex-wrap gap-x-6 gap-y-2 text-muted">
          <li v-for="interest in about.interests" :key="interest">{{ interest }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { profile, links } from '../data/portfolio.js'
</script>

<template>
  <div class="bg-field text-on-field">
  <footer class="frame py-12 sm:py-14">
    <p class="display text-[clamp(2.5rem,6vw,5.5rem)] text-on-field">I Wayan Gunaya</p>
    <div class="mt-10 flex flex-col gap-4 text-base sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <a :href="links.github" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">GitHub</a>
        <a :href="links.linkedin" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">LinkedIn</a>
        <a href="#home" class="underline underline-offset-4">Back to top ↑</a>
      </div>
    </div>
  </footer>
  </div>
</template>

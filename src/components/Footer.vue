<script setup>
import { profile, links } from '../data/portfolio.js'
</script>

<template>
  <footer class="frame py-10 lg:py-12">
    <div class="text-small flex flex-col gap-4 text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <a :href="links.instagram" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">Instagram</a>
        <a :href="links.telegram" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">Telegram</a>
        <a href="#home" class="underline underline-offset-4">Back to top</a>
      </div>
    </div>
  </footer>
</template>

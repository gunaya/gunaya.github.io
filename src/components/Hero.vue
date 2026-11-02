<script setup>
import { profile } from '../data/portfolio.js'

const emailHref = `mailto:${profile.email}`
</script>

<template>
  <section id="home" class="frame flex flex-col justify-end gap-8 pb-16 pt-28 lg:min-h-[calc(100svh-4rem)] lg:pb-20 lg:pt-20">
    <div>
      <p class="text-lg text-muted">Hello, I’m <span class="text-ink">{{ profile.name }}</span></p>
      <h1 class="mt-6 font-display text-[clamp(2.75rem,4.8vw,5.25rem)] font-bold leading-[1] tracking-[-0.035em] text-ink">Building thoughtful digital things.</h1>
      <p class="mt-8 max-w-[38ch] text-xl leading-relaxed text-ink">{{ profile.tagline }}.</p>
      <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a :href="emailHref" class="button">Get in touch</a>
        <a href="#skills" class="text-base underline underline-offset-4">Explore my skills</a>
      </div>
    </div>
  </section>
</template>

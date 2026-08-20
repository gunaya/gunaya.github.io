<script setup>
import { profile, links } from '../data/portfolio.js'

const socials = [
  { name: 'GitHub', href: links.github, icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
  { name: 'LinkedIn', href: links.linkedin, icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', href: links.instagram, icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
  { name: 'Telegram', href: links.telegram, icon: 'M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
]

const emailHref = `mailto:${profile.email}`
</script>

<template>
  <section id="home" class="relative flex min-h-screen items-center overflow-hidden pt-16">
    <div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/20"></div>
    <div class="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20"></div>

    <div class="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        Available for opportunities
      </p>

      <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
        Hi, I'm
        <span class="bg-gradient-to-r from-accent-500 to-indigo-500 bg-clip-text text-transparent">{{ profile.name }}</span>
      </h1>
      <p class="mt-3 text-xl font-semibold text-slate-600 dark:text-slate-300 sm:text-2xl">
        {{ profile.credentials }} · {{ profile.role }}
      </p>

      <p class="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        {{ profile.tagline }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#skills"
          class="rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-500"
        >
          My skills
        </a>
        <a
          :href="emailHref"
          class="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-accent-500 hover:text-accent-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-accent-500 dark:hover:text-accent-400"
        >
          Get in touch
        </a>
      </div>

      <div class="mt-10 flex items-center gap-3">
        <a
          v-for="s in socials"
          :key="s.name"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.name"
          class="rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:border-accent-500 hover:text-accent-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-accent-500 dark:hover:text-accent-400"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path :d="s.icon" />
          </svg>
        </a>
      </div>
    </div>

    <a href="#about" class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-slate-400 hover:text-accent-500 sm:block">
      <svg class="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </a>
  </section>
</template>

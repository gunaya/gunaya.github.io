<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { setupSmoothScroll } from './utils/smooth-scroll.js';
import { sections } from './data/portfolio.js';
import Navbar from './components/Navbar.vue';
import Stage from './components/Stage.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Photography from './components/Photography.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

const isDark = ref(false);
const active = ref('home');
const progress = ref(0);
let cleanupSmoothScroll;

function toggleTheme() {
	isDark.value = !isDark.value;
	document.documentElement.classList.toggle('dark', isDark.value);
	localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function updateActive() {
	let current = 'home';
	for (const s of sections) {
		const el = document.getElementById(s.id);
		if (el && el.getBoundingClientRect().top <= 120) current = s.id;
	}
	active.value = current;
	const el = document.getElementById(current);
	if (el) {
		const { top, height } = el.getBoundingClientRect();
		progress.value = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - top) / height));
	}
}

onMounted(() => {
	cleanupSmoothScroll = setupSmoothScroll();
	const saved = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	isDark.value = saved ? saved === 'dark' : prefersDark;
	document.documentElement.classList.toggle('dark', isDark.value);
	window.addEventListener('scroll', updateActive, { passive: true });
	updateActive();
});
onBeforeUnmount(() => {
	cleanupSmoothScroll?.();
	window.removeEventListener('scroll', updateActive);
});
</script>

<template>
	<div class="min-h-svh overflow-x-clip bg-ground text-ink transition-colors">
		<Navbar :is-dark="isDark" :active="active" @toggle-theme="toggleTheme" />
		<main class="pt-16 lg:pt-0">
			<div class="lg:grid lg:grid-cols-2">
				<Stage :active="active" :progress="progress" />
				<div class="min-w-0 lg:col-start-1 lg:row-start-1">
					<Hero />
					<About />
					<Skills />
				</div>
			</div>
			<Photography />
			<Contact />
		</main>
		<Footer />
	</div>
</template>

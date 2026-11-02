<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { setupSmoothScroll } from './utils/smooth-scroll.js';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Photography from './components/Photography.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

let cleanupSmoothScroll;
let readyTimer;

onMounted(() => {
	cleanupSmoothScroll = setupSmoothScroll();
	document.documentElement.classList.add('js');
	readyTimer = requestAnimationFrame(() => {
		document.documentElement.classList.add('ready');
	});
});
onBeforeUnmount(() => {
	cleanupSmoothScroll?.();
	cancelAnimationFrame(readyTimer);
});
</script>

<template>
	<div class="min-h-svh overflow-x-clip bg-ground text-ink">
		<Navbar />
		<main class="pt-16">
			<Hero />
			<About />
			<Skills />
			<Photography />
			<Contact />
		</main>
		<Footer />
	</div>
</template>

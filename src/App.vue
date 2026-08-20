<script setup>
	import { ref, onMounted } from 'vue';
	import Navbar from './components/Navbar.vue';
	import Hero from './components/Hero.vue';
	import About from './components/About.vue';
	import Skills from './components/Skills.vue';
	import Photography from './components/Photography.vue';
	import Contact from './components/Contact.vue';
	import Footer from './components/Footer.vue';

	const isDark = ref(false);

	function toggleTheme() {
		isDark.value = !isDark.value;
		document.documentElement.classList.toggle('dark', isDark.value);
		localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
	}

	onMounted(() => {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		isDark.value = saved ? saved === 'dark' : prefersDark;
		document.documentElement.classList.toggle('dark', isDark.value);
	});
</script>

<template>
	<div class="min-h-screen overflow-x-hidden bg-white text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-200">
		<Navbar :is-dark="isDark" @toggle-theme="toggleTheme" />
		<main>
			<Hero />
			<About />
			<Skills />
			<Photography />
			<Contact />
		</main>
		<Footer />
	</div>
</template>

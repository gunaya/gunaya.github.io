<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { sections } from '../data/portfolio.js';

const active = ref('home');
const menuOpen = ref(false);
const links = sections.filter((s) => s.id !== 'home');

function onScroll() {
	const pos = window.scrollY + 120;
	let current = 'home';
	for (const s of sections) {
		const el = document.getElementById(s.id);
		if (el && el.offsetTop <= pos) current = s.id;
	}
	active.value = current;
}

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
	<header class="fixed inset-x-0 top-0 z-50 bg-ground">
		<nav class="frame flex h-16 items-center justify-between gap-6">
			<a href="#home" class="text-body font-medium tracking-tight text-ink">I Wayan Gunaya</a>

			<div class="hidden items-center gap-7 lg:flex">
				<a
					v-for="s in links"
					:key="s.id"
					:href="`#${s.id}`"
					class="text-small transition-colors"
					:aria-current="active === s.id ? 'location' : undefined"
					:class="active === s.id ? 'text-ink underline underline-offset-8' : 'text-muted hover:text-ink'">
					{{ s.label }}
				</a>
			</div>

			<button type="button" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="menuOpen" :aria-controls="menuOpen ? 'mobile-menu' : undefined" class="p-3 text-ink lg:hidden" @click="menuOpen = !menuOpen">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
					<path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
					<path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</nav>

		<div v-if="menuOpen" id="mobile-menu" class="frame bg-ground pb-6 lg:hidden">
			<a
				v-for="s in links"
				:key="s.id"
				:href="`#${s.id}`"
				class="block py-3 text-lead text-ink"
				@click="menuOpen = false">
				{{ s.label }}
			</a>
		</div>
	</header>
</template>

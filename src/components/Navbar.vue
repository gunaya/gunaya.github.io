<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { sections } from '../data/portfolio.js';

defineProps({
	isDark: Boolean
});
defineEmits(['toggle-theme']);

const active = ref('home');
const menuOpen = ref(false);

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
			<a href="#home" class="font-display text-xl font-bold tracking-tight text-ink">I Wayan Gunaya</a>

			<div class="hidden items-center gap-6 xl:flex">
				<a
					v-for="s in sections.filter((s) => s.id !== 'home')"
					:key="s.id"
					:href="`#${s.id}`"
					class="text-base transition-colors"
					:aria-current="active === s.id ? 'location' : undefined"
					:class="active === s.id ? 'font-semibold text-accent' : 'text-muted hover:text-ink'">
					{{ s.label }}
				</a>
				<button type="button" class="text-base text-muted transition-colors hover:text-ink" @click="$emit('toggle-theme')">
					{{ isDark ? 'Light mode' : 'Dark mode' }}
				</button>
			</div>

			<button type="button" aria-label="Toggle menu" :aria-expanded="menuOpen" aria-controls="mobile-menu" class="p-2 text-ink xl:hidden" @click="menuOpen = !menuOpen">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
					<path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
					<path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</nav>

		<div v-if="menuOpen" id="mobile-menu" class="bg-ground px-6 pb-6 xl:hidden">
			<a
				v-for="s in sections.filter((s) => s.id !== 'home')"
				:key="s.id"
				:href="`#${s.id}`"
				class="block py-3 text-xl text-ink"
				@click="menuOpen = false">
				{{ s.label }}
			</a>
			<button type="button" class="mt-2 block py-3 text-left text-base text-muted" @click="$emit('toggle-theme')">
				Switch to {{ isDark ? 'light' : 'dark' }} theme
			</button>
		</div>
	</header>
</template>

<script setup>
	import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
	import photos from '../generated/photos/index.js';
	import { createSlots, shuffle } from '../utils/gallery.js';
	import { photoDescriptions } from '../data/photo-descriptions.js';

	const ordered = shuffle(photos);
	const displayed = ref(createSlots(photos));
	const selected = ref(null);
	const selectedOpen = ref(false);
	const dialog = ref(null);
	const closeButton = ref(null);
	let previousFocus = null;
	let swapTimer = null;

	function description(photo) {
		return photoDescriptions[photo.filename] || 'Photograph from I Wayan Gunaya’s portfolio';
	}

	function swapRandom() {
		const used = new Set(displayed.value.map((photo) => photo.src));
		const remaining = photos.filter((photo) => !used.has(photo.src));
		if (!remaining.length || !displayed.value.length) return;
		const slot = Math.floor(Math.random() * displayed.value.length);
		const matching = remaining.filter((photo) => photo.orient === displayed.value[slot].orient);
		const candidates = matching.length ? matching : remaining;
		const next = candidates[Math.floor(Math.random() * candidates.length)];
		displayed.value = displayed.value.map((photo, i) => i === slot ? next : photo);
	}

	async function show(photo) {
		previousFocus = document.activeElement;
		selected.value = photo;
		selectedOpen.value = true;
		await nextTick();
		closeButton.value?.focus();
	}
	function close() {
		selectedOpen.value = false;
		previousFocus?.focus();
	}
	const index = computed(() => selected.value ? ordered.indexOf(selected.value) : 0);
	function prev() { selected.value = ordered[(index.value - 1 + ordered.length) % ordered.length]; }
	function next() { selected.value = ordered[(index.value + 1) % ordered.length]; }
	function onKey(e) {
		if (!selectedOpen.value) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
		else if (e.key === 'Tab') {
			const buttons = [...dialog.value.querySelectorAll('button:not([disabled])')];
			if (e.shiftKey && document.activeElement === buttons[0]) {
				e.preventDefault();
				buttons[buttons.length - 1].focus();
			} else if (!e.shiftKey && document.activeElement === buttons[buttons.length - 1]) {
				e.preventDefault();
				buttons[0].focus();
			}
		}
	}
	onMounted(() => {
		window.addEventListener('keydown', onKey);
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			swapTimer = setInterval(swapRandom, 3200);
		}
	});
	onBeforeUnmount(() => {
		window.removeEventListener('keydown', onKey);
		clearInterval(swapTimer);
	});
</script>

<template>
	<section id="photography" class="scroll-mt-16 py-24 sm:py-32">
		<div class="mx-auto max-w-6xl px-4 sm:px-6">
			<div class="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<div v-reveal="{ from: 'left' }">
					<p class="section-label mb-4">03 / Beyond the screen</p>
					<h2 class="section-title">A different<br>point of view<span class="text-accent-500">.</span></h2>
				</div>
				<p v-reveal="{ from: 'right' }" class="max-w-sm leading-relaxed text-slate-600 dark:text-slate-400">A collection of moments seen through my lens. Select a photo to take a closer look.</p>
			</div>

			<div v-if="displayed.length" class="columns-1 gap-4 sm:columns-2 lg:columns-3">
				<div v-for="(photo, i) in displayed" :key="'slot-' + i" v-reveal="{ from: 'zoom', delay: i % 3 }" class="photo-tile group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
					<button type="button" class="block w-full" @click="show(photo)">
						<Transition name="fade" mode="out-in">
							<img :key="photo.src" :src="photo.thumbnail" :alt="description(photo)" loading="lazy" class="w-full transition duration-500 group-hover:scale-105" />
						</Transition>
					</button>
				</div>
			</div>
			<p v-else class="text-slate-500 dark:text-slate-400">No photos yet — drop some images into <code class="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">src/assets/img</code>.</p>
		</div>

		<Teleport to="body">
			<div v-if="selectedOpen && selected" ref="dialog" role="dialog" aria-modal="true" aria-label="Photography viewer" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" @click="close">
				<button ref="closeButton" type="button" class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close" @click.stop="close">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<button v-if="ordered.length > 1" type="button" class="absolute left-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Previous" @click.stop="prev">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>
				<button v-if="ordered.length > 1" type="button" class="absolute right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Next" @click.stop="next">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>

				<figure class="max-h-full max-w-4xl" @click.stop>
					<img :src="selected.src" :alt="description(selected)" class="max-h-[80vh] w-auto rounded-lg object-contain" />
					<figcaption class="mt-3 text-center text-sm text-slate-300">{{ description(selected) }} · {{ index + 1 }} / {{ ordered.length }}</figcaption>
				</figure>
			</div>
		</Teleport>
	</section>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.7s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>

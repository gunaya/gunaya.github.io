<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, computed } from 'vue';
import { sheetPhotos } from '../utils/photos.js';
import { photoDescriptions } from '../data/photo-descriptions.js';

const selected = ref(null);
const paused = ref(false);
const closeButton = ref(null);
const dialog = ref(null);
let previousFocus = null;

const index = computed(() => (selected.value ? sheetPhotos.findIndex((photo) => photo.src === selected.value.src) : 0));

function description(photo) {
	return photoDescriptions[photo.filename] || 'Photograph from I Wayan Gunaya’s portfolio';
}

async function open(photo) {
	previousFocus = document.activeElement;
	selected.value = photo;
	await nextTick();
	closeButton.value?.focus();
}
function close() {
	selected.value = null;
	previousFocus?.focus();
}
function step(delta) {
	const total = sheetPhotos.length;
	selected.value = sheetPhotos[(index.value + delta + total) % total];
}
function onKey(e) {
	if (!selected.value) return;
	if (e.key === 'Escape') close();
	else if (e.key === 'ArrowLeft') step(-1);
	else if (e.key === 'ArrowRight') step(1);
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
onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
	<section id="photography" class="section scroll-mt-16 frame">
		<div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
			<h2 class="h-section" data-reveal>Photography</h2>
			<p class="text-body max-w-[46ch] lg:text-right" data-reveal style="--d: 120ms">
				{{ sheetPhotos.length }} photographs from my travels around Bali. Select any frame to view it larger.
			</p>
		</div>

		<div class="reel mt-16" data-reveal>
			<div class="reel-track" :class="{ 'is-paused': paused }">
				<ul class="flex gap-3 pr-3">
					<li v-for="photo in sheetPhotos" :key="photo.src" class="h-56 shrink-0 sm:h-72">
						<button type="button" class="block h-full overflow-hidden" :aria-label="`View: ${description(photo)}`" @click="open(photo)">
							<img :src="photo.thumbnail" :alt="description(photo)" :width="photo.width" :height="photo.height" loading="lazy" class="h-full w-auto transition duration-500 hover:scale-[1.02]" />
						</button>
					</li>
				</ul>
				<ul class="reel-copy flex gap-3 pr-3" aria-hidden="true" inert>
					<li v-for="photo in sheetPhotos" :key="`copy-${photo.src}`" class="h-56 shrink-0 sm:h-72">
						<img :src="photo.thumbnail" alt="" :width="photo.width" :height="photo.height" loading="lazy" class="h-full w-auto" />
					</li>
				</ul>
			</div>
		</div>
		<div class="mt-6 flex justify-end motion-reduce:hidden">
			<button type="button" class="text-small underline underline-offset-4" @click="paused = !paused">{{ paused ? 'Play slideshow' : 'Pause slideshow' }}</button>
		</div>

		<Teleport to="body">
			<div
				v-if="selected"
				ref="dialog"
				role="dialog"
				aria-modal="true"
				aria-label="Photography viewer"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
				@click="close">
				<button ref="closeButton" type="button" class="absolute right-4 top-4 bg-white/20 p-3 text-white transition hover:bg-white/30" aria-label="Close" @click.stop="close">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<button type="button" class="absolute left-4 bg-white/20 p-3 text-white transition hover:bg-white/30" aria-label="Previous photograph" @click.stop="step(-1)">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>
				<button type="button" class="absolute right-4 bg-white/20 p-3 text-white transition hover:bg-white/30" aria-label="Next photograph" @click.stop="step(1)">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>

				<figure class="max-h-full max-w-5xl" @click.stop>
					<img :src="selected.src" :alt="description(selected)" class="max-h-[80svh] w-auto object-contain" />
					<figcaption class="mt-3 text-center text-small text-white/80">{{ description(selected) }} · {{ index + 1 }} / {{ sheetPhotos.length }}</figcaption>
				</figure>
			</div>
		</Teleport>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import photos from '../generated/photos/index.js';
import { photoDescriptions } from '../data/photo-descriptions.js';

const props = defineProps({
	active: { type: String, required: true },
	progress: { type: Number, default: 0 }
});

const scenes = {
	home: ['DSCF0797.JPG'],
	about: ['DSC05274 (2).jpg', 'DSC05476.jpg'],
	skills: ['DSC05510-Enhanced-NR.jpg', 'DSCF0661.JPG']
};

const frames = Object.entries(scenes).flatMap(([section, names]) =>
	names
		.map((name) => photos.find((photo) => photo.filename === name))
		.filter(Boolean)
		.map((photo, index) => ({ photo, section, index, key: `${section}:${index}` }))
);

const current = computed(() => {
	const list = frames.filter((frame) => frame.section === props.active);
	if (!list.length) return frames[0];
	const i = Math.min(list.length - 1, Math.floor(props.progress * list.length));
	return list[i];
});

function description(photo) {
	return photoDescriptions[photo.filename] || 'Photograph from I Wayan Gunaya’s portfolio';
}
</script>

<template>
	<aside class="relative h-[60svh] overflow-hidden bg-surface lg:sticky lg:top-16 lg:col-start-2 lg:row-start-1 lg:h-[calc(100svh-4rem)] lg:self-start">
		<img
			v-for="frame in frames"
			:key="frame.key"
			:src="frame.photo.src"
			:alt="frame.key === current.key ? description(frame.photo) : ''"
			:aria-hidden="frame.key === current.key ? undefined : 'true'"
			class="stage-image absolute inset-0 h-full w-full object-cover"
			:class="{ 'is-visible': frame.key === current.key }" />
		<p class="absolute inset-x-0 bottom-0 bg-ground px-[var(--frame)] py-3 text-sm text-muted">{{ description(current.photo) }}</p>
	</aside>
</template>

<style scoped>
	.stage-image {
		opacity: 0;
		transform: scale(1.04);
		transition: opacity 1.2s ease-out, transform 9s linear;
	}
	.stage-image.is-visible {
		opacity: 1;
		transform: scale(1);
	}
	@media (prefers-reduced-motion: reduce) {
		.stage-image {
			transform: none !important;
			transition: none;
		}
	}
</style>

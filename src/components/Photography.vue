<script setup>
	import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

	const modules = import.meta.glob('../assets/img/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,avif}', {
		eager: true,
		import: 'default'
	});

	const photos = Object.entries(modules).map(([path, src]) => {
		const name = path
			.split('/')
			.pop()
			.replace(/\.[^.]+$/, '');
		return { src, name: name.replace(/[-_]+/g, ' ') };
	});

	function shuffle(arr) {
		const a = [...arr];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	const ordered = shuffle(photos);

	const PORTRAIT = 'portrait';
	const LANDSCAPE = 'landscape';
	const SLOT_COUNT = 8;
	const slotOrient = [PORTRAIT, LANDSCAPE, LANDSCAPE, LANDSCAPE, PORTRAIT, LANDSCAPE, PORTRAIT, PORTRAIT];

	const displayed = ref([]);
	const poolPortrait = ref([]);
	const poolLandscape = ref([]);

	function loadOrientations() {
		return Promise.all(
			photos.map(
				(p) =>
					new Promise((resolve) => {
						const img = new Image();
						img.onload = () => {
							p.orient = img.naturalWidth > img.naturalHeight ? LANDSCAPE : PORTRAIT;
							resolve();
						};
						img.onerror = () => {
							p.orient = LANDSCAPE;
							resolve();
						};
						img.src = p.src;
					})
			)
		);
	}

	function initSlots() {
		const arr = Array(SLOT_COUNT).fill(null);
		const portraits = shuffle(photos.filter((p) => p.orient === PORTRAIT));
		const landscapes = shuffle(photos.filter((p) => p.orient === LANDSCAPE));
		for (let i = 0; i < SLOT_COUNT; i++) arr[i] = slotOrient[i] === PORTRAIT ? portraits.pop() : landscapes.pop();
		const rest = [...portraits, ...landscapes];
		for (let i = 0; i < SLOT_COUNT; i++) {
			if (!arr[i]) arr[i] = rest.shift();
		}
		const used = new Set(arr.map((p) => p.src));
		poolPortrait.value = portraits.filter((p) => !used.has(p.src));
		poolLandscape.value = landscapes.filter((p) => !used.has(p.src));
		displayed.value = arr;
	}

	function swapRandom() {
		const arr = displayed.value;
		const union = [...poolPortrait.value, ...poolLandscape.value];
		if (!union.length) return;
		const slot = Math.floor(Math.random() * arr.length);
		const targetOrient = arr[slot].orient;
		let cand = targetOrient === PORTRAIT ? [...poolPortrait.value] : [...poolLandscape.value];
		if (!cand.length) cand = union;
		if (!cand.length) return;
		const next = cand[Math.floor(Math.random() * cand.length)];
		const old = arr[slot];
		if (next.orient === PORTRAIT) poolPortrait.value = poolPortrait.value.filter((p) => p.src !== next.src);
		else poolLandscape.value = poolLandscape.value.filter((p) => p.src !== next.src);
		if (old.orient === PORTRAIT) poolPortrait.value.push(old);
		else poolLandscape.value.push(old);
		displayed.value = arr.map((p, i) => (i === slot ? next : p));
	}

	let swapTimer = null;

	const selected = ref(null);
	const selectedOpen = ref(false);

	function show(photo) {
		selected.value = photo;
		selectedOpen.value = true;
	}
	function close() {
		selectedOpen.value = false;
	}

	const index = computed(() => (selected.value ? ordered.indexOf(selected.value) : 0));
	function prev() {
		const i = ordered.indexOf(selected.value);
		selected.value = ordered[(i - 1 + ordered.length) % ordered.length];
	}
	function next() {
		const i = ordered.indexOf(selected.value);
		selected.value = ordered[(i + 1) % ordered.length];
	}

	function onKey(e) {
		if (!selectedOpen.value) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}

	onMounted(async () => {
		await loadOrientations();
		initSlots();
		window.addEventListener('keydown', onKey);
		swapTimer = setInterval(swapRandom, 3200);
	});
	onBeforeUnmount(() => {
		window.removeEventListener('keydown', onKey);
		clearInterval(swapTimer);
	});
</script>

<template>
	<section id="photography" class="scroll-mt-16 py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6">
			<div class="mb-12">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Photography</h2>
				<div class="mt-3 h-1 w-16 rounded-full bg-accent-500"></div>
				<p class="mt-4 max-w-xl text-slate-600 dark:text-slate-400">A few shots I've taken myself.</p>
			</div>

			<div v-if="displayed.length" class="columns-1 gap-4 sm:columns-2 lg:columns-3">
				<div v-for="(photo, i) in displayed" :key="'slot-' + i" class="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
					<button type="button" class="block w-full" @click="show(photo)">
						<Transition name="fade" mode="out-in">
							<img :key="photo.src" :src="photo.src" :alt="photo.name" loading="lazy" class="w-full transition duration-500 group-hover:scale-105" />
						</Transition>
					</button>
				</div>
			</div>
			<p v-else class="text-slate-500 dark:text-slate-400">No photos yet — drop some images into <code class="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">src/assets/img</code>.</p>
		</div>

		<Teleport to="body">
			<div v-if="selectedOpen && selected" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" @click="close">
				<button type="button" class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close" @click.stop="close">
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
					<img :src="selected.src" :alt="selected.name" class="max-h-[80vh] w-auto rounded-lg object-contain" />
					<figcaption class="mt-3 text-center text-sm text-slate-300">{{ selected.name }} · {{ index + 1 }} / {{ ordered.length }}</figcaption>
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

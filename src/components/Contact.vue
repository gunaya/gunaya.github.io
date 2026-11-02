<script setup>
import { ref } from 'vue';
import { profile } from '../data/portfolio.js';

const form = ref({ name: '', email: '', message: '' });
const sent = ref(false);

function submit() {
	const subject = encodeURIComponent(`Portfolio contact from ${form.value.name}`);
	const body = encodeURIComponent(`${form.value.message}\n\n— ${form.value.name} (${form.value.email})`);
	window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
	sent.value = true;
}
</script>

<template>
	<section id="contact" class="section scroll-mt-16 frame">
		<div class="sheet-card sheet-scallop mx-auto max-w-[44rem]" data-reveal>
			<h2 class="h-section">Let’s talk</h2>
			<p class="text-lead mt-6 max-w-[30ch]">Have a project, a teaching opportunity, or just want to say hi?</p>

			<form class="mt-10 grid gap-6" @submit.prevent="submit">
				<div>
					<label for="name" class="text-small text-muted">Name</label>
					<input id="name" v-model="form.name" type="text" required placeholder="Your name" autocomplete="name" class="field-input" />
				</div>
				<div>
					<label for="email" class="text-small text-muted">Email</label>
					<input id="email" v-model="form.email" type="email" required placeholder="you@example.com" autocomplete="email" class="field-input" />
				</div>
				<div>
					<label for="message" class="text-small text-muted">Message</label>
					<textarea id="message" v-model="form.message" required rows="5" placeholder="Your message" class="field-input resize-none"></textarea>
				</div>
				<p id="draft-note" class="text-small text-muted">Opens a draft in your email app. Nothing is sent from this page.</p>
				<button type="submit" class="button w-full" aria-describedby="draft-note">Open email draft</button>
				<p v-if="sent" role="status" class="text-small">
					Nothing opened? Write to <a :href="`mailto:${profile.email}`" class="underline underline-offset-4">{{ profile.email }}</a> directly.
				</p>
			</form>
		</div>

		<div class="stub mx-auto mt-6 flex max-w-[44rem] flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
			<a :href="`mailto:${profile.email}`" class="break-all font-display text-item underline underline-offset-8">{{ profile.email }}</a>
			<span class="text-small text-muted">Or write directly</span>
		</div>
	</section>
</template>

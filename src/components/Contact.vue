<script setup>
import { ref } from 'vue';
import { profile, links } from '../data/portfolio.js';

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
	<section id="contact" class="frame scroll-mt-16 py-28 sm:py-40">
		<div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
			<div>
				<h2 class="h-section max-w-[10ch] text-ink">Let’s talk.</h2>
				<p class="mt-8 max-w-[40ch] text-xl leading-relaxed text-muted">Have a project in mind, a teaching opportunity, or just want to say hi? My inbox is always open.</p>
				<ul class="mt-12 space-y-5 text-lg text-ink">
					<li>
						<a :href="`mailto:${profile.email}`" class="block break-all font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-accent underline decoration-2 underline-offset-8">{{ profile.email }}</a>
					</li>
					<li><a :href="links.github" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">GitHub</a></li>
					<li><a :href="links.linkedin" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">LinkedIn</a></li>
				</ul>
			</div>

			<form class="space-y-6 rounded-3xl bg-surface p-6 sm:p-10" @submit.prevent="submit">
				<h3 class="font-display text-2xl font-bold tracking-tight text-ink">Start a conversation</h3>
				<p class="text-base text-muted">This form opens a draft in your email app.</p>
				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-ink">Name</label>
					<input id="name" v-model="form.name" type="text" required placeholder="Your name" class="w-full rounded-xl border-0 bg-ground px-4 py-3 text-lg text-ink placeholder:text-muted outline-none" />
				</div>
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-ink">Email</label>
					<input id="email" v-model="form.email" type="email" required placeholder="you@example.com" class="w-full rounded-xl border-0 bg-ground px-4 py-3 text-lg text-ink placeholder:text-muted outline-none" />
				</div>
				<div>
					<label for="message" class="mb-2 block text-sm font-medium text-ink">Message</label>
					<textarea id="message" v-model="form.message" required rows="5" placeholder="Your message..." class="w-full resize-none rounded-xl border-0 bg-ground px-4 py-3 text-lg text-ink placeholder:text-muted outline-none"></textarea>
				</div>
				<button type="submit" class="button w-full justify-center">Send message</button>
				<p v-if="sent" role="status" class="text-base text-accent">Opening your email client…</p>
			</form>
		</div>
	</section>
</template>

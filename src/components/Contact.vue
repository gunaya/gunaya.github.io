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
	<section id="contact" class="scroll-mt-16 bg-slate-50 py-20 dark:bg-slate-900/40">
		<div class="mx-auto max-w-6xl px-4 sm:px-6">
			<div class="mb-12">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
				<div class="mt-3 h-1 w-16 rounded-full bg-accent-500"></div>
				<p class="mt-4 max-w-xl text-slate-600 dark:text-slate-400">Have a project in mind, a teaching opportunity, or just want to say hi? My inbox is always open.</p>
			</div>

			<div class="grid gap-10 lg:grid-cols-2">
				<div class="space-y-4">
					<a
						:href="`mailto:${profile.email}`"
						class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-accent-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-accent-500">
						<span class="rounded-xl bg-accent-500/10 p-3 text-accent-600 dark:text-accent-400">
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
							</svg>
						</span>
						<span>
							<span class="block text-sm text-slate-500 dark:text-slate-400">Email</span>
							<span class="font-medium">{{ profile.email }}</span>
						</span>
					</a>

					<a
						:href="links.github"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-accent-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-accent-500">
						<span class="rounded-xl bg-accent-500/10 p-3 text-accent-600 dark:text-accent-400">
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						</span>
						<span>
							<span class="block text-sm text-slate-500 dark:text-slate-400">GitHub</span>
							<span class="font-medium">{{ links.github }}</span>
						</span>
					</a>

					<a
						:href="links.linkedin"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-accent-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-accent-500">
						<span class="rounded-xl bg-accent-500/10 p-3 text-accent-600 dark:text-accent-400">
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</span>
						<span>
							<span class="block text-sm text-slate-500 dark:text-slate-400">LinkedIn</span>
							<span class="font-medium">{{ links.linkedin }}</span>
						</span>
					</a>
				</div>

				<form class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950" @submit.prevent="submit">
					<div class="space-y-4">
						<div>
							<label for="name" class="mb-1.5 block text-sm font-medium">Name</label>
							<input
								id="name"
								v-model="form.name"
								type="text"
								required
								placeholder="Your name"
								class="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-accent-500 dark:border-slate-700" />
						</div>
						<div>
							<label for="email" class="mb-1.5 block text-sm font-medium">Email</label>
							<input
								id="email"
								v-model="form.email"
								type="email"
								required
								placeholder="you@example.com"
								class="w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-accent-500 dark:border-slate-700" />
						</div>
						<div>
							<label for="message" class="mb-1.5 block text-sm font-medium">Message</label>
							<textarea
								id="message"
								v-model="form.message"
								required
								rows="5"
								placeholder="Your message..."
								class="w-full resize-none rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none transition focus:border-accent-500 dark:border-slate-700"></textarea>
						</div>
						<button type="submit" class="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-500">
							Send message
						</button>
						<p v-if="sent" class="text-center text-sm text-emerald-600 dark:text-emerald-400">Opening your email client…</p>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { fetchUCAN } from '$lib/api';

	let ucanToken = $state<string | null>(null);
	let errorMessage = $state<string | null>(null);

	async function generateUCAN() {
		try {
			const { success, data, error } = await fetchUCAN('POST');
			if (success) {
				ucanToken = data.token;
			} else {
				errorMessage = error || 'Failed to generate UCAN token.';
				console.error(errorMessage);
			}
		} catch (error) {
			errorMessage = 'An unexpected error occurred while generating UCAN token. Error: ' + error;
			console.error('Error generating UCAN token:', error);
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
	<div class="my-4 w-full max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Generate UCAN Token</h1>
		<div class="mt-4">
			<button
				onclick={generateUCAN}
				class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
			>
				Generate UCAN Token
			</button>
		</div>
		<div class="mt-4">
			<p class="break-words text-gray-900 dark:text-white">Generated UCAN Token: {ucanToken}</p>
			{#if errorMessage}
				<p class="text-red-500 dark:text-red-400">{errorMessage}</p>
			{/if}
		</div>
		<div class="mt-4">
			<a
				href="/"
				class="text-blue-500 underline hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-800"
				>Home</a
			>
		</div>
	</div>
</div>

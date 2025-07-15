<script lang="ts">
	import type { FormGeneratePassword } from '$lib/interface';
	import InputCheckbox from './InputCheckbox.svelte';
	import { onMount } from 'svelte';

	// props
	let {
		settings = $bindable(),
		passwordLength = $bindable(),
		password = $bindable()
	}: FormGeneratePassword = $props();

	let isDisabled = $state(false)

	onMount(() => {
		const checkViewport = () => {
			isDisabled = window.innerWidth < 1440;
		};

		checkViewport(); // Initial check
		window.addEventListener('resize', checkViewport);

		// Clean up on destroy
		return () => window.removeEventListener('resize', checkViewport);
	});

	// strength blocks
	const blocks = Array.from({ length: 4 });

	// percent derived from inputRange
	let percent = $derived(() => ((passwordLength - 0) / (20 - 0)) * 100);
	// password strength
	let strong = $derived(() => {
		let score = 0;

		// 1. Length check
		if (passwordLength >= 8) score += 1;
		if (passwordLength >= 12) score += 1;

		// 2. Character types
		const types = [
			settings.includeLowercaseLetters.checked,
			settings.includeUppercaseLetters.checked,
			settings.includeLowercaseLetters.checked,
			settings.includeSymbols.checked
		];
		const enabledTypes = types.filter(Boolean).length;

		if (enabledTypes >= 2) score += 1;
		if (enabledTypes >= 4) score += 1;

		// 3. Password strength
		let finalScore = Math.min(score, 4);

		// 4. Background colors
		const bgColors = [
			'', // score 0 → no color
			'bg-red-500', // score 1
			'bg-orange-400', // score 2
			'bg-yellow-400', // score 3
			'bg-green-400' // score 4
		];

		const strengthLabel = [
			'', // score 0
			'Too Weak!', // score 1
			'Weak', // score 2
			'Medium', // score 3
			'Strong' // score 4
		];

		// Final score: 0 - 4
		return {
			score: finalScore,
			color: bgColors[finalScore],
			label: strengthLabel[finalScore]
		};
	});

	function generateFunction() {
		const lowercase = 'abcdefghijklmnopqrstuvwxyz';
		const uppercase = lowercase.toUpperCase();
		const numbers = '0123456789';
		const symbols = '!@#$%^&*()-_=+[]{}|;:,.<>?';

		let allowedChars = '';
		if (settings.includeLowercaseLetters.checked) allowedChars += lowercase;
		if (settings.includeUppercaseLetters.checked) allowedChars += uppercase;
		if (settings.includeNumbers.checked) allowedChars += numbers;
		if (settings.includeSymbols.checked) allowedChars += symbols;

		if (!allowedChars) return '';

		let password = '';
		for (let i = 0; i < passwordLength; i++) {
			const randomIndex = Math.floor(Math.random() * allowedChars.length);
			password += allowedChars[randomIndex];
		}

		return password;
	}
</script>

<div
	class="max-w-container-mobile bg-grey-800 text-preset-4 md:max-w-container-tablet md:text-preset-3 flex w-full flex-col p-4 md:px-8 md:py-6"
>
	<div class="flex items-center justify-between pb-2 md:pb-4">
		<span class="text-white">Characters Length</span>
		<span
			class="text-preset-2 md:text-preset-1 text-right whitespace-pre text-green-200 transition duration-500 ease-in-out"
			>{#if passwordLength < 10}
				{passwordLength}&nbsp;
			{:else}
				{passwordLength}
			{/if}
		</span>
	</div>

	<input
		type="range"
		bind:value={passwordLength}
		min="0"
		max="20"
		class="custom-input-range"
		style="background: linear-gradient(to right, #a4ffaf 0%, #a4ffaf {percent()}%, #18171f {percent()}%, #18171f 100%);"
	/>

	<div class="flex flex-col gap-4.25 py-8 text-white md:gap-4">
		{#each Object.entries(settings) as [key, setting]}
			<InputCheckbox label={setting.label} bind:checked={setting.checked} />
		{/each}
	</div>

	<div
		class="bg-grey-850 mb-4 flex items-center justify-between px-4 py-3.5 {strong().label
			? ' md:py-5'
			: 'md:py-5.5'} md:mb-8 md:px-8"
	>
		<span class="text-grey-600 uppercase">strength</span>
		<div class="flex items-center gap-2">
			{#if strong().label}
				<span
					class="text-preset-3 md:text-preset-2 pr-4 text-white uppercase transition duration-300 ease-in-out"
					>{strong().label}</span
				>
			{/if}
			{#each blocks as _, i}
				<div
					class="border-grey-200 h-7 w-2.5 border-2 transition duration-150 {i < strong().score
						? strong().color
						: ''}"
				></div>
			{/each}
		</div>
	</div>

	<button
		disabled={strong().score === 0 || passwordLength < 1}
		onclick={() => (password = generateFunction())}
		class="hover:bg-grey-850 md:disabled:hover:bg-grey-850 md:disabled:hover:border-grey-850 md:disabled:hover:fill-grey-200 md:disabled:hover:text-grey-200 flex cursor-pointer items-center justify-center gap-4 bg-green-200 px-26 py-4.5 text-center uppercase hover:border-2 hover:border-green-200 hover:fill-green-200 hover:py-4 hover:text-green-200 disabled:cursor-not-allowed md:mb-4.25 md:gap-6 md:py-4.5 {isDisabled ? "disabled:bg-grey-850 disabled:border-grey-850 disabled:fill-grey-200 disabled:text-grey-200" : ""}"
		>generate
		<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"
			><path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" /></svg
		>
	</button>
</div>

<script lang="ts">
	let { password = $bindable() }: { password: string } = $props();
	let isCopyed = $state(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(password);
		isCopyed = true;
		setTimeout(() => {
			isCopyed = false;
		}, 7000);
	}
</script>

<div
	class="max-w-container-mobile bg-grey-800 md:max-w-container-tablet flex w-full items-center justify-between p-4 md:mb-6 md:px-8 md:py-4.75"
>
	<span class="text-preset-2 md:text-preset-1 {password !== '' ? 'text-white' : 'text-grey-700'}"
		>{password || 'P4$5W0rD!'}</span
	>
	<button type="button" onclick={copyToClipboard} class="cursor-pointer hover:opacity-80 flex gap-2 md:gap-4 disabled:cursor-not-allowed uppercase text-preset-4 md:text-preset-3 text-green-200 transition duration-500 ease-in-out" disabled={!password}>
		{#if isCopyed}
			copied
		{/if}
		<svg width="21" height="24" xmlns="http://www.w3.org/2000/svg" 
			><path
				d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
				fill="#A4FFAF" class="hover:fill-white"
			/></svg
		>
	</button>
</div>

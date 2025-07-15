<script lang="ts">
	let { label, checked = $bindable() } = $props();
</script>

<label
	class="flex cursor-pointer items-center gap-4 hover:text-green-200 hover:opacity-80 md:gap-6"
>
	<input
		bind:checked
		type="checkbox"
		class="border-grey-200 h-5 w-5 cursor-pointer appearance-none rounded-none border-2 accent-green-200 transition duration-150 checked:border-green-200 checked:bg-green-200 checked:bg-[url('/icon-check.svg')] checked:bg-contain checked:bg-center checked:bg-no-repeat hover:border-2 hover:border-green-200"
	/>
	<span>{label}</span>
</label>

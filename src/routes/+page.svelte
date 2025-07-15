<script lang="ts">
	import PasswordResult from '$lib/components/PasswordResult.svelte';
	import PasswordSetting from '$lib/components/PasswordSetting.svelte';

	let formInputRange = $state(0);
    let password = $state('');

	let formInputCheckbox = $state({
		includeUppercaseLetters: {
			label: 'Include Uppercase Letters',
			checked: false
		},
		includeLowercaseLetters: {
			label: 'Include Lowercase Letters',
			checked: false
		},
		includeNumbers: {
			label: 'Include Numbers',
			checked: false
		},
		includeSymbols: {
			label: 'Include Symbols',
			checked: false
		}
	});

	
</script>

<main
	class="font-family-regular flex h-screen flex-col items-center justify-center gap-4 bg-black md:gap-0 md:justify-start md:mt-33.5"
>
	<h1 class="text-preset-4 text-grey-600 md:text-preset-2 md:mb-8">Password Generator</h1>
	<PasswordResult bind:password={password} />
	<PasswordSetting bind:settings={formInputCheckbox} bind:passwordLength={formInputRange} bind:password={password}  />
</main>

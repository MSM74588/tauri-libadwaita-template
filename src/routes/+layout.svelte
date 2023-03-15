<script>
	import { onMount } from 'svelte';
	import { appWindow } from '@tauri-apps/api/window';
	import '../app.css';

	// const maximized = appWindow.isMaximized();
	// console.log(maximized)

	let isMaximized = false;
    // ERROR-CORRECTION, it is turned to true, but its not working as expected

	// console.log(`${isMaximized}: Default value of isMaximised`);

	async function checkWindowMaximizedStatus() {
		isMaximized = await appWindow.isMaximized();
		// console.log(isMaximized);
	}

	onMount(() => {
		checkWindowMaximizedStatus();
	});

	// $: windowSize = [window.innerWidth, window.innerHeight];

	// function handleWindowResize() {
	// 	const [width, height] = [window.innerWidth, window.innerHeight];
	// 	if (width !== windowSize[0] || height !== windowSize[1]) {
	// 		checkWindowMaximizedStatus();
	// 		windowSize = [width, height];
	// 	}
	// }

	// window icons
	import minimize from '$lib/window-decorations/window-minimize-symbolic.svg';
	import maximise from '$lib/window-decorations/window-maximize-symbolic.svg';
	import close from '$lib/window-decorations/application-exit-symbolic.svg';
	import restore from '$lib/window-decorations/window-restore-symbolic.svg';

	// console.log(window.isMaximized())
</script>

<div class="flex flex-col w-screen  h-screen bg-transparent">
	<div
		id="title-bar"
		class="bg-titlebar h-12  rounded-t-xl border-border_color border-[1px] select-none text-primaryfont hover:cursor-default relative"
	>
		<div
			class="w-full h-full absolute top-0 flex align-middle flex-row justify-center"
			id="layer-1"
		>
			<p class="text-center m-auto font-semibold">Test title bar</p>
		</div>
		<div class="w-full h-full absolute top-0 flex flex-row" id="layer-2">
			<div id="settings-area" />
			<div
				id="title-area "
				class="flex-grow flex items-center justify-center pl-[7%]"
				data-tauri-drag-region
			>
				<!-- <p class="text">Test title bar</p> -->
			</div>
			<div id="titlebar-button-area" class="flex items-center gap-3 pr-3 z-50">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="minimise"
					class="w-6 bg-buttonbg aspect-square rounded-full duration-150 hover:bg-buttonbghover flex align-middle justify-center"
					on:click={() => {
						appWindow.minimize();
					}}
				>
					<img class="stroke-primaryfont" src={minimize} alt="" />
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="maximise"
					class="w-6 bg-buttonbg aspect-square rounded-full duration-150 hover:bg-buttonbghover  flex align-middle justify-center"
					on:click={() => {
						appWindow.toggleMaximize();
						checkWindowMaximizedStatus();
					}}
				>
					{#if isMaximized}
						<img class="stroke-primaryfont" src={maximise} alt="" />
					{:else}
						<img class="stroke-primaryfont" src={restore} alt="" />
					{/if}
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="close"
					class="w-6 bg-buttonbg aspect-square rounded-full duration-150 hover:bg-buttonbghover  flex align-middle justify-center"
					on:click={() => {
						appWindow.close();
					}}
				>
					<img class="stroke-primaryfont" src={close} alt="" />
				</div>
			</div>
		</div>
	</div>
	<div class="bg-background text-primaryfont h-full rounded-b-xl border-t-0 border-border_color border-[1px]">
		<slot />
	</div>
</div>

<!-- <script use:window="{resize: handleWindowResize}" /> -->
<!-- <style>
	* {
		outline: 3px solid #ffffff50;
	}
</style> -->

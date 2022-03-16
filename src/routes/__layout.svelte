<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import './materialUiImports';
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton, { Icon } from '@smui/icon-button';
	import { mdiMenu, mdiFormatColorFill, mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
	import { Svg } from '@smui/common/elements';

	let topAppBar: TopAppBarComponentDev;
	let darkTheme: boolean | undefined = undefined;

	// onMount(() => {
	// 	darkTheme = window.matchMedia('(prefers-color-scheme: dark)')
	// }),
</script>

<svelte:head>
	<!-- SMUI Styles -->
	{#if darkTheme === undefined}
		<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if darkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>IAMBIG2TINY</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton
				aria-label="Change Theme"
				on:click={() => (darkTheme = !darkTheme)}
				title={darkTheme ? 'Lights On!' : 'Lights Off!'}
			>
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={darkTheme ? mdiWeatherSunny : mdiWeatherNight} />
				</Icon>
			</IconButton>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot />
</AutoAdjust>

<style>
	/* Hide everything above this component. */
	:global(app),
	:global(body),
	:global(html) {
		display: block !important;
		height: auto !important;
		width: auto !important;
		position: static !important;
	}
</style>

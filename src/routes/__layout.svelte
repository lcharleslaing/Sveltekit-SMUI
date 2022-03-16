<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import './materialUiImports';
	import type { TopAppBarComponentDev } from '@smui/top-app-bar';
	import TopAppBar, { Row, Section, Title, AutoAdjust } from '@smui/top-app-bar';
	import IconButton, { Icon } from '@smui/icon-button';
	import {
		mdiOrderBoolAscendingVariant,
		mdiAt,
		mdiHeadPlus,
		mdiMenu,
		mdiDotsGrid,
		mdiBellRing,
		mdiWeatherSunny,
		mdiWeatherNight,
		mdiAccountBox,
		mdiChatQuestion,
		mdiNumeric
	} from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import Drawer, { AppContent, Content, Header, Subtitle, Scrim } from '@smui/drawer';
	import Button, { Label } from '@smui/button';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import { H6 } from '@smui/common/elements';

	let open = false;
	let active = 'Inbox';

	function setActive(value: string) {
		active = value;
		open = false;
	}

	let topAppBar: TopAppBarComponentDev;
	let darkTheme: boolean | undefined = false;

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
			<IconButton on:click={() => (open = !open)}>
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiMenu} />
				</Icon>
			</IconButton>
			<Title>IAMBIG2TINY</Title>
		</Section>
		<Section align="end" toolbar>
			<!-- Apps Button -->
			<IconButton aria-label="Change Theme">
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiDotsGrid} />
				</Icon>
			</IconButton>
			<!-- Notifications Button -->
			<IconButton aria-label="Change Theme">
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiBellRing} />
				</Icon>
			</IconButton>
			<!-- Future Button -->
			<IconButton aria-label="Change Theme">
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiHeadPlus} />
				</Icon>
			</IconButton>
			<!-- Users Account Button -->
			<IconButton aria-label="Change Theme">
				<Icon component={Svg} viewBox="0 0 24 24">
					<path fill="currentColor" d={mdiAccountBox} />
				</Icon>
			</IconButton>
			<!-- Theme Mode Toggle Button -->
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

<div class="drawer-container">
	<!-- Don't include fixed={false} if this is a page wide drawer.
        It adds a style for absolute positioning. -->
	<Drawer variant="modal" fixed={true} bind:open>
		<!-- TODO header used as spacer -->
		<Header>
			<br />
			<br />
			<br />
			<Title class="">IAMBIG2TINY</Title>
			<Subtitle>Released Apps</Subtitle>
		</Header>
		<Content>
			<List>
				<!-- Gematria -->
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Inbox')}
					activated={active === 'Inbox'}
				>
					<Graphic class="material-icons" aria-hidden="true">
						<Icon component={Svg} viewBox="0 0 24 24">
							<path fill="currentColor" d={mdiNumeric} />
						</Icon>
					</Graphic>
					<Text>Gematria</Text>
				</Item>
				<!-- Task Manager -->
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Star')}
					activated={active === 'Star'}
				>
					<Graphic class="material-icons" aria-hidden="true">
						<Icon component={Svg} viewBox="0 0 24 24">
							<path fill="currentColor" d={mdiOrderBoolAscendingVariant} />
						</Icon>
					</Graphic>
					<Text>Task Manager</Text>
				</Item>

				<Separator />
				<Subheader component={H6}>Main Menu</Subheader>
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Work')}
					activated={active === 'Work'}
				>
					<Graphic class="material-icons" aria-hidden="true">home</Graphic>
					<Text>Home</Text>
				</Item>
				<!-- About -->
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Friends')}
					activated={active === 'Friends'}
				>
					<Graphic aria-hidden="true">
						<Icon component={Svg} viewBox="0 0 24 24">
							<path fill="currentColor" d={mdiChatQuestion} />
						</Icon>
					</Graphic>
					<Text>About</Text>
				</Item>

				<!-- Contact -->
				<Item
					href="javascript:void(0)"
					on:click={() => setActive('Family')}
					activated={active === 'Family'}
				>
					<Graphic aria-hidden="true">
						<Icon component={Svg} viewBox="0 0 24 24">
							<path fill="currentColor" d={mdiAt} />
						</Icon>
					</Graphic>
					<Text>Contact</Text>
				</Item>
			</List>
		</Content>
	</Drawer>
	<!-- Don't include fixed={false} if this is a page wide drawer.
			It adds a style for absolute positioning. -->
	<Scrim fixed={false} />
	<AppContent class="app-content">
		<main class="main-content">
			<div style="min-height: 100vh;">
				<AutoAdjust {topAppBar}>
					<slot />
				</AutoAdjust>
			</div>
		</main>
	</AppContent>
</div>

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
	/* These classes are only needed because the
    drawer is in a container on the page. */
	.drawer-container {
		position: relative;
		display: flex;
		height: full;
		max-width: 600px;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}

	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		flex-grow: 1;
	}

	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>

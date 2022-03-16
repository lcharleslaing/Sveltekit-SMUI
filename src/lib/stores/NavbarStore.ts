// stores/user.js
import { writable } from 'svelte/store';
import { browser } from '$app/env';

const changeThemeMode = () => {
	const darkMode = browser && localStorage.registered;
	const { set, update, subscribe } = writable(darkMode || false);

	return {
		subscribe,
		darkModeUpdate: () => set(browser && (localStorage.darkMode = true)),
		lightModeUpdate: () => set(browser && (localStorage.darkMode = false))
	};
};

export const darkMode = changeThemeMode();

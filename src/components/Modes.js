import React, { useState } from 'react';
// import { ReactComponent as Sun } from '../assets/sun-solid.svg';
// import { ReactComponent as Moon } from '../assets/moon-solid.svg';

import dark from '../assets/sun-solid.svg';
import light from '../assets/moon-solid.svg';

let root = document.documentElement;

// Dark
const darkPrimary = getComputedStyle(root).getPropertyValue('--dark-primary');
const darkElement = getComputedStyle(root).getPropertyValue('--dark-element');
const darkTextPrimary = getComputedStyle(root).getPropertyValue('--dark-text-primary');
const darkTextSecondary = getComputedStyle(root).getPropertyValue('--dark-text-secondary');
const darkBoxShadow = getComputedStyle(root).getPropertyPriority('--dark-box-shadow');

// Light
const lightPrimary = getComputedStyle(root).getPropertyValue('--light-primary');
const lightElement = getComputedStyle(root).getPropertyValue('--light-element');
const lightTextPrimary = getComputedStyle(root).getPropertyValue('--light-text-primary');
const lightTextSecondary = getComputedStyle(root).getPropertyValue('--light-text-secondary');
const lightBoxShadow = getComputedStyle(root).getPropertyPriority('--light-box-shadow');

export function Mode() {
	const [mode, setMode] = useState(dark);

	function handleMode() {
		if (mode === dark) {
			setMode(light);
			root.style.setProperty('--primary', lightPrimary);
			root.style.setProperty('--element', lightElement);
			root.style.setProperty('--text-primary', lightTextPrimary);
			root.style.setProperty('--text-secondary', lightTextSecondary);
			root.style.setProperty('--box-shadow', lightBoxShadow);
		} else {
			setMode(dark);
			root.style.setProperty('--primary', darkPrimary);
			root.style.setProperty('--element', darkElement);
			root.style.setProperty('--text-primary', darkTextPrimary);
			root.style.setProperty('--text-secondary', darkTextSecondary);
			root.style.setProperty('--box-shadow', darkBoxShadow);
		}
	}

	return <img onClick={handleMode} className='mode-icon' src={mode} alt='Mode Icon' />;
}

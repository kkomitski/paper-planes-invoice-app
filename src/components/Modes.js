import React, { useState } from 'react';
// import { ReactComponent as Sun } from '../assets/sun-solid.svg';
// import { ReactComponent as Moon } from '../assets/moon-solid.svg';

import dark from '../assets/sun-solid.svg';
import light from '../assets/moon-solid.svg';

let root = document.documentElement;

// Dark
const darkPrimary = getComputedStyle(root).getPropertyValue('--dark-primary');
const darkSecondary = getComputedStyle(root).getPropertyValue('--dark-secondary');
const darkElement = getComputedStyle(root).getPropertyValue('--dark-element');
const darkTextPrimary = getComputedStyle(root).getPropertyValue('--dark-text-primary');
const darkTextSecondary = getComputedStyle(root).getPropertyValue('--dark-text-secondary');
const darkBoxShadow = getComputedStyle(root).getPropertyValue('--dark-box-shadow');
const darkpaidText = getComputedStyle(root).getPropertyValue('--dark-paid-text');
const darkpaidBg = getComputedStyle(root).getPropertyValue('--dark-paid-bg');
const darkpendingText = getComputedStyle(root).getPropertyValue('--dark-pending-text');
const darkpendingBg = getComputedStyle(root).getPropertyValue('--dark-pending-bg');
const darkoverDueText = getComputedStyle(root).getPropertyValue('--dark-overdue-text');
const darkoverDueBg = getComputedStyle(root).getPropertyValue('--dark-overdue-bg');
const darkdraftText = getComputedStyle(root).getPropertyValue('--dark-draft-text');
const darkdraftBg = getComputedStyle(root).getPropertyValue('--dark-draft-bg');

// Light
const lightPrimary = getComputedStyle(root).getPropertyValue('--light-primary');
const lightSecondary = getComputedStyle(root).getPropertyValue('--light-secondary');
const lightElement = getComputedStyle(root).getPropertyValue('--light-element');
const lightTextPrimary = getComputedStyle(root).getPropertyValue('--light-text-primary');
const lightTextSecondary = getComputedStyle(root).getPropertyValue('--light-text-secondary');
const lightBoxShadow = getComputedStyle(root).getPropertyValue('--light-box-shadow');
const lightpaidText = getComputedStyle(root).getPropertyValue('--light-paid-text');
const lightpaidBg = getComputedStyle(root).getPropertyValue('--light-paid-bg');
const lightpendingText = getComputedStyle(root).getPropertyValue('--light-pending-text');
const lightpendingBg = getComputedStyle(root).getPropertyValue('--light-pending-bg');
const lightoverDueText = getComputedStyle(root).getPropertyValue('--light-overdue-text');
const lightoverDueBg = getComputedStyle(root).getPropertyValue('--light-overdue-bg');
const lightdraftText = getComputedStyle(root).getPropertyValue('--light-draft-text');
const lightdraftBg = getComputedStyle(root).getPropertyValue('--light-draft-bg');

export function Mode() {
	const [mode, setMode] = useState(light);

	function handleMode() {
		// console.log(lightpaidText);
		console.log('click');

		if (mode === dark) {
			setMode(light);
			root.style.setProperty('--primary', lightPrimary);
			root.style.setProperty('--secondary', lightSecondary);
			root.style.setProperty('--element', lightElement);
			root.style.setProperty('--text-primary', lightTextPrimary);
			root.style.setProperty('--text-secondary', lightTextSecondary);
			root.style.setProperty('--box-shadow', lightBoxShadow);
			root.style.setProperty('--paid-text', lightpaidText);
			root.style.setProperty('--paid-bg', lightpaidBg);
			root.style.setProperty('--pending-text', lightpendingText);
			root.style.setProperty('--pending-bg', lightpendingBg);
			root.style.setProperty('--overdue-text', lightoverDueText);
			root.style.setProperty('--overdue-bg', lightoverDueBg);
			root.style.setProperty('--draft-text', lightdraftText);
			root.style.setProperty('--draft-bg', lightdraftBg);
		} else {
			setMode(dark);
			root.style.setProperty('--primary', darkPrimary);
			root.style.setProperty('--secondary', darkSecondary);
			root.style.setProperty('--element', darkElement);
			root.style.setProperty('--text-primary', darkTextPrimary);
			root.style.setProperty('--text-secondary', darkTextSecondary);
			root.style.setProperty('--box-shadow', darkBoxShadow);
			root.style.setProperty('--paid-text', darkpaidText);
			root.style.setProperty('--paid-bg', darkpaidBg);
			root.style.setProperty('--pending-text', darkpendingText);
			root.style.setProperty('--pending-bg', darkpendingBg);
			root.style.setProperty('--overdue-text', darkoverDueText);
			root.style.setProperty('--overdue-bg', darkoverDueBg);
			root.style.setProperty('--draft-text', darkdraftText);
			root.style.setProperty('--draft-bg', darkdraftBg);
		}
	}

	return <img onClick={handleMode} className='mode-icon' src={mode} alt='Mode Icon' />;
}

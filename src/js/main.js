/////////////////
// I M P O R T //
/////////////////

import jump from 'jump.js';

/////////////////
// S E L E C T //
/////////////////

const logo = document.querySelector('#navbar-logo');
const about = document.querySelector('#navbar-about');
const follow = document.querySelector('#navbar-follow');
const contact = document.querySelector('#navbar-contact');

/////////////////
// D E F I N E //
/////////////////

const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = [
	'Node.js wizard',
	'CSS artist',
	'passionate Kitesurfer',
	'JavaScript lover',
	'HTML tinkerer',
	'Photography enthusiast',
];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 1200; // Time the fully typed text is displayed
const initialOffset = 1400; // Offset before 1st start
const newTextOffset = 400; // Offset before nth start
let textArrayIndex = 0;
let charIndex = 0;

/////////////////
// H E L P E R //
/////////////////

const jumpToSection = target => {
	jump(target, {
		duration: distance => Math.abs(distance) * 0.6,
	});
};

const type = () => {
	if (charIndex < textArray[textArrayIndex].length) {
		if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	} else {
		cursorSpan.classList.remove('typing');
		setTimeout(erase, newTextDelay);
	}
};

const erase = () => {
	if (charIndex > 0) {
		if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
		typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
		charIndex--;
		setTimeout(erase, erasingDelay);
	} else {
		cursorSpan.classList.remove('typing');
		textArrayIndex++;
		if (textArrayIndex >= textArray.length) textArrayIndex = 0;
		setTimeout(type, typingDelay + newTextOffset);
	}
};

/////////////////
// L I S T E N //
/////////////////

document.addEventListener('DOMContentLoaded', () => {
	if (textArray.length) setTimeout(type, initialOffset);
});

logo.addEventListener('click', () => {
	jumpToSection('body');
});

about.addEventListener('click', () => {
	jumpToSection('#about');
});

follow.addEventListener('click', () => {
	jumpToSection('#follow');
});

contact.addEventListener('click', () => {
	jumpToSection('#contact');
});

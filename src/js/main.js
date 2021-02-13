/////////////////
// I M P O R T //
/////////////////

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

/////////////////
// S E L E C T //
/////////////////

// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// IntersectionObserver
const sections = document.querySelectorAll('section');

/////////////////
// D E F I N E //
/////////////////

// Typing effect
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

// IntersectionObserver
const options = {
	rootMargin: '-40%',
};
let timeouts = {};

/////////////////
// H E L P E R //
/////////////////

// Typing effect
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

// IntersectionObserver
const io = new IntersectionObserver(entries => {
	for (const entry of entries) {
		let navItem = document.getElementById(`navbar-${entry.target.id}`);
		if (entry.isIntersecting) {
			timeouts[entry.target.id] = setTimeout(() => {
				navItem.classList.add('active'); // Add .active class to nav item
			}, 180); // Delay
		} else {
			clearTimeout(timeouts[entry.target.id]);
			navItem.classList.remove('active'); // Remove .active from nav item
			return;
		}
	}
}, options);

sections.forEach(section => io.observe(section));

/////////////////
// L I S T E N //
/////////////////

// Typing effect
document.addEventListener('DOMContentLoaded', () => {
	if (textArray.length) setTimeout(type, initialOffset);
});

// Smooth scrolling
document.addEventListener('click', event => {
	if (!event.target.matches('.nav-scroll')) return;
	event.preventDefault();
	let element = document.getElementById(event.target.dataset.target);
	element.scrollIntoView({ behavior: 'smooth' });
});

/////////////////
// I M P O R T //
/////////////////

import smoothscroll from 'smoothscroll-polyfill';
import ProgressBar from 'progressbar.js';

smoothscroll.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
	// console.log('Hamburger clicked 🍔');
	hamburger.classList.toggle('is-active');
});

/////////////////
// S E L E C T //
/////////////////

// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// IntersectionObserver
const sections = document.querySelectorAll('section');

// Date calculations
const today = new Date();
const ageSpan = document.querySelector('#age');
const yearSpan = document.querySelector('#year');

// Contact links
const contactLinks = document.querySelectorAll('.to-contact');

// Circular progress bars
const circleWrappers = document.querySelectorAll('.circle-wrapper');

/////////////////
// D E F I N E //
/////////////////

// Typing effect
const textArray = [
	'Node.js wizard',
	'CSS artist',
	'passionate Kitesurfer',
	'JavaScript lover',
	'Crypto rascal',
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
const delay = 160;

// Calculate age
const dob = new Date('1988/03/19');

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
			}, delay);
		} else {
			clearTimeout(timeouts[entry.target.id]);
			navItem.classList.remove('active'); // Remove .active from nav item
			return;
		}
	}
}, options);

sections.forEach(section => io.observe(section));

const circleWatch = new IntersectionObserver(entries => {
	for (const entry of entries) {
		if (entry.isIntersecting && entry.target.id === 'skills') {
			drawCircles();
		} else if (!entry.isIntersecting && entry.target.id === 'skills') {
			// Remove all SVG child nodes from parents in 'Skills' section
			circleWrappers.forEach(circleWrapper => {
				circleWrapper.innerHTML = '';
			});
		} else {
			return;
		}
	}
}, options);

sections.forEach(section => circleWatch.observe(section));

// Calculate age
const calculateAge = () => {
	const diff = today - dob;
	const age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
	return age;
};

// Circular progress bars
const drawCircles = () => {
	circleWrappers.forEach(skill => {
		// Grab skill level from DOM dataset
		let skillLevel = skill.dataset.skillLevel;

		let circle = new ProgressBar.Circle(skill, {
			easing: 'easeOut',
			duration: 1400,
			color: '#0afdd8',
			trailColor: '#020214',
			strokeWidth: 3,
			svgStyle: {
				height: '100%',
			},
		});
		circle.animate(skillLevel);
	});
};

/////////////////
// L I S T E N //
/////////////////

// Typing effect
document.addEventListener('DOMContentLoaded', () => {
	if (textArray.length) setTimeout(type, initialOffset);
});

// Calculate age
document.addEventListener('DOMContentLoaded', () => {
	ageSpan.textContent = calculateAge();
	yearSpan.textContent = today.getFullYear();
});

// Smooth scrolling
document.addEventListener('click', event => {
	if (!event.target.matches('.nav-scroll')) return;
	event.preventDefault();
	let element = document.getElementById(event.target.dataset.target);
	element.scrollIntoView({ behavior: 'smooth' });
});

// Contact links
contactLinks.forEach(link => {
	link.addEventListener('click', () => {
		let element = document.getElementById('contact');
		element.scrollIntoView({ behavior: 'smooth' });
	});
});

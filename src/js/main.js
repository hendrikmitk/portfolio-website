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

// IntersectionObserver
const sections = document.querySelectorAll('section');

// Contact links
const contactLinks = document.querySelectorAll('.to-contact');

// Circular progress bars
const circleWrappers = document.querySelectorAll('.circle-wrapper');

/////////////////
// D E F I N E //
/////////////////

// IntersectionObserver
const options = {
	rootMargin: '-40%',
};
let timeouts = {};
const delay = 160;

/////////////////
// H E L P E R //
/////////////////

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
			// Clear-up SVG child nodes from parents
			circleWrappers.forEach(circleWrapper => {
				circleWrapper.innerHTML = '';
			});
			// Draw fresh SVG child nodes
			drawCircles();
		} else if (!entry.isIntersecting && entry.target.id === 'skills') {
			// Remove all SVG child nodes when leaving section
			circleWrappers.forEach(circleWrapper => {
				circleWrapper.innerHTML = '';
			});
		} else {
			return;
		}
	}
}, options);

sections.forEach(section => circleWatch.observe(section));

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

// Handle navigation clicks (Smooth scrolling)
document.addEventListener('click', event => {
	if (!event.target.matches('.nav-scroll')) return;

	// Handle navigation clicks on `/imprint.html`
	if (window.location.pathname == '/imprint.html') {
		location.href = `/#${event.target.dataset.target}`;
	}

	event.preventDefault();
	let element = document.getElementById(event.target.dataset.target);
	element.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
	// Draw SVG child nodes when Skills are loaded
	if (window.location.hash == '#skills') {
		drawCircles();
	}
	// Add .active class to nav item when page is loaded
	let hash = window.location.hash;
	let hashName = hash.substring(1); // Remove hash sign
	let navItem = document.getElementById(`navbar-${hashName}`);
	navItem.classList.add('active');
});

// Handle Contact links
contactLinks.forEach(link => {
	link.addEventListener('click', () => {
		let element = document.getElementById('contact');
		element.scrollIntoView({ behavior: 'smooth' });
	});
});

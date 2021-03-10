/////////////////
// S E L E C T //
/////////////////

const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

/////////////////
// D E F I N E //
/////////////////

const textArray = [
	'CSS artist',
	'Node.js wizard',
	'passionate Kitesurfer',
	'JavaScript lover',
	'Crypto rascal',
	'HTML tinkerer'
];
const typingDelay = 80;
const erasingDelay = 60;
const newTextDelay = 1000; // Time the fully typed text is displayed
const initialOffset = 1400; // Offset before 1st start
const newTextOffset = 400; // Offset before nth start
let textArrayIndex = 0;
let charIndex = 0;

/////////////////
// H E L P E R //
/////////////////

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

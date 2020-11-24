import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, map, delay, filter, tap, skip } from 'rxjs/operators';

const title = document.createElement('div');
title.innerHTML = `<h3>Drag the card around!</h3><p>Press Shift to change Card color</p><p>Press Space to create a new Card</p>`;
document.body.appendChild(title);

const random_color = () => {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};

// const body = document.querySelector('#body');
const card = document.createElement('div');
card.style.cssText = `position: absolute; width: 100px; height: 100px; border-radius: 6px;
	background-image: linear-gradient(45deg, royalblue, lightblue); box-shadow: #333 3px 3px 5px;
	cursor: grab; border: 4px solid #eee`;

document.body.append(card);

const mouseDown$ = fromEvent(card, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup'); // <== document
const mouseMove$ = fromEvent(document, 'mousemove'); // <== document..não card

const keyUp$ = fromEvent(document, 'keyup');

const dragAndDrop = mouseDown$.pipe(
	map((e) => ({
		x: e.clientX,
		y: e.clientY,
		target: {
			x: e.target.offsetLeft,
			y: e.target.offsetTop,
		},
	})),
	switchMap((start) =>
		merge(
			mouseMove$.pipe(
				map((e) => ({
					x: e.clientX - start.x + start.target.x,
					y: e.clientY - start.y + start.target.y,
				})),
				takeUntil(mouseUp$)
			),
			keyUp$.pipe(
				filter((e) => e.which === 16 || e.which === 32),
				tap((key) => {
					console.log(key);
					if (key.code === 'ShiftLeft') {
						card.style.backgroundImage = `linear-gradient(45deg, ${random_color()}, ${random_color()})`;
					} else if (key.code === 'Space') {
						const clone = card.cloneNode();
						clone.style.border = 'none';
						document.body.insertBefore(clone, card);
					}
				}),
				skip() // descarta o fluxo de keyUp$ sem retorná-lo
			)
		)
	)
);

dragAndDrop.pipe(delay(240)).subscribe((val) => {
	card.style.top = `${val.y}px`;
	card.style.left = `${val.x}px`;
});

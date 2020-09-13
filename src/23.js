import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, map, delay, filter, tap, skip } from 'rxjs/operators';

const random_color = () => {
	let n = (Math.random() * 0xfffff * 1000000).toString(16);
	return '#' + n.slice(0, 6);
};

// const body = document.querySelector('#body');
const card = document.createElement('div');
card.style.cssText = `position: absolute; width: 300px; height: 200px;
	background-image: linear-gradient(45deg, royalblue, lightblue); box-shadow: #333 3px 3px 5px;
	cursor: grab;`;

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
				filter((e) => e.which === 32), // tecla de espaço
				tap((key) => {
					const clone = card.cloneNode();
					document.body.insertBefore(clone, card); // irado!
					// document.body.append(clone); // adicionaria o clone por baixo
					card.style.backgroundImage = `linear-gradient(45deg, ${random_color()}, ${random_color()})`;
				}),
				skip() // descarta o fluxo de keyUp$ sem retorná-lo
			)
		)
	)
);

dragAndDrop.pipe(delay(240)).subscribe((val) => {
	// console.log(val);
	card.style.top = `${val.y}px`;
	card.style.left = `${val.x}px`;
});

//	(parameter) start: {
//	 x: any;
//	 y: any;
//	 target: {
//	 		x: any;
//	 		y: any;
//	 };
//	 }

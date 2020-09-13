import { fromEvent } from 'rxjs';
import {
	throttleTime,
	switchMap,
	takeUntil,
	map,
	tap,
	debounceTime,
	delay,
} from 'rxjs/operators';

const body = document.querySelector('#body');
const card = document.createElement('div');
card.style.cssText = `position: absolute; width: 300px; height: 200px;
	background-color: #42df98; box-shadow: #333 3px 3px 5px;
	cursor: grab`;

body.append(card);

// fromEvent(card, 'mouseover').subscribe((v) => console.log(v));
// fromEvent(card, 'mousemove').subscribe((v) => console.log(v));

// armazena observables criadas a partir dos eventos ...
const mouseDown$ = fromEvent(card, 'mousedown');
const mouseUp$ = fromEvent(card, 'mouseup');
const mouseMove$ = fromEvent(card, 'mousemove');

const dragAndDrop = mouseDown$.pipe(
	map((e) => ({
		x: e.clientX,
		y: e.y,
		target: {
			x: e.target.offsetLeft,
			y: e.target.offsetTop,
		},
	})),
	switchMap((start) =>
		mouseMove$.pipe(
			map((e) => ({
				x: e.clientX - start.x + start.target.x,
				y: e.clientY - start.y + start.target.y,
			})),
			takeUntil(mouseUp$)
		)
	)
);

dragAndDrop.pipe(delay(80)).subscribe((val) => {
	console.log(val);
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

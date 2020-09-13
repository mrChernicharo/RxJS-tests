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
	background-image: linear-gradient(45deg, green, #42df98); box-shadow: #333 3px 3px 5px;
	cursor: grab`;

body.append(card);

const mouseDown$ = fromEvent(card, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');
const mouseMove$ = fromEvent(document, 'mousemove');

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
		mouseMove$.pipe(
			map((e) => ({
				x: e.clientX - start.x + start.target.x,
				y: e.clientY - start.y + start.target.y,
			})),
			takeUntil(mouseUp$)
		)
	)
);

dragAndDrop.pipe(delay(120)).subscribe((val) => {
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

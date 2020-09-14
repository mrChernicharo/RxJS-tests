import { concat, fromEvent, merge, of } from 'rxjs';
import {
	concatMap,
	map,
	mergeMap,
	pluck,
	switchMap,
	exhaustMap,
	tap,
	combineAll,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const api = (response, delay) =>
	ajax({
		url: `http://localhost:5200/response/${JSON.stringify(response)}/delay/${delay}`,
	});

const content = document.querySelector('#content');
const btnSend = document.querySelector('#b2');
const btnStop = document.querySelector('#b1');

const buttonRequest$ = fromEvent(btnSend, 'click');
const buttonStopRequest$ = fromEvent(btnStop, 'click');

const setContentHTML = (text) => (content.innerHTML = text);

buttonRequest$
	.pipe(
		tap(() => {
			setContentHTML(`Carregando...`);
		}),
		switchMap(() => api({ data: 'Hello API' }, 2000)),
		pluck('response', 'data'),
		// tap((v) => {
		// 	console.log(v);
		// 	setContentHTML(v);
		// }),
		tap(setContentHTML)
	)
	.subscribe();

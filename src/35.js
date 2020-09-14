import { concat, fromEvent, merge, of, race } from 'rxjs';
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

const content = document.querySelector('#content');
const btnSend = document.querySelector('#b2');
const btnStop = document.querySelector('#b1');

const buttonRequest$ = fromEvent(btnSend, 'click');
const buttonStopRequest$ = fromEvent(btnStop, 'click');

const api = (response, delay) =>
	ajax({
		url: `http://localhost:5200/response/${JSON.stringify(response)}/delay/${delay}`,
	});

const setContentHTML = (text) => (content.innerHTML = text);

const request = api({ data: 'Hello API' }, 2000).pipe(
	pluck('response', 'data'),
	tap(setContentHTML)
);

const stopRequest = buttonStopRequest$.pipe(
	tap(() => setContentHTML('Requisição cancelada'))
);

const requesting = (bool) => {
	btnSend.style = showElement(!bool);
	btnStop.style = showElement(bool);
};

const showElement = (bool) => {
	return bool ? 'display : block' : 'display: none';
};

buttonRequest$
	.pipe(
		tap(() => {
			requesting(true);
			setContentHTML(`Carregando...`);
		}),
		switchMap(() => race(request, stopRequest)), // <==
		tap(() => requesting(false))
	)
	.subscribe();

// o race() recebe dois observables, e executa a que demorar menos tempo pra resolver

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

buttonRequest$
	.pipe(
		tap(() => {
			content.innerHTML = `Carregando...`;
		}),
		switchMap(() => api({ data: 'Hello API' }, 2000)),
		pluck('response'),
		tap((v) => {
			console.log(v);
			content.innerHTML = v.data;
		})
	)
	.subscribe();

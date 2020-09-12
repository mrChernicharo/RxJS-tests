import { interval, Observable, pipe } from 'rxjs';
import { debounce, map, take } from 'rxjs/operators';

// criar observable
const obs = new Observable((observer) => {
	console.log('iniciando Observable');
	observer.next(1);
	observer.next(2);
	observer.next(3);
});

// criar promise
const promise = new Promise((resolve) => {
	console.log('iniciando Promise');
	resolve(1);
	resolve(2); // uma promise só resolve uma única vez, portanto essa linha com o número 2 nunca é executada
});

promise.then((data) => console.log('Promise ->' + data));
setTimeout(() => {
	promise.then((data) => console.log('Promise ->' + data));
}, 6000);

// observables só são executadas a partir do momento em que tem alguém escutando
setTimeout(() => {
	obs.subscribe((data) => {
		console.log('Observable ->' + data);
	});
}, 2000);

setTimeout(() => {
	obs.subscribe((data) => {
		console.log('2a subscription ->' + data);
	});
}, 4000);

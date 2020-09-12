import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

let number = 0;
console.log(number);

// Promises tem comportamento Eager, o resolve roda uma vez só e é imediatamente executado em todos os .then()

// Observables executam o bloco de novo pra cada .subscribe()

const myPromise = new Promise((resolve) => {
	console.log('Iniciando promise! ' + number); // 1
	number++;
	setTimeout(() => resolve(number), 3000);
});

const myObservable = new Observable((observer) => {
	console.log('Iniciando Observable! ' + number);
	import { Observable } from 'rxjs';
	import { share } from 'rxjs/operators';

	let number = 0;
	console.log(number);

	// Promises tem comportamento Eager, o resolve roda uma vez só e é imediatamente executado em todos os .then()

	// Observables executam o bloco de novo pra cada .subscribe()

	const myPromise = new Promise((resolve) => {
		console.log('Iniciando promise! ' + number);
		number++;
		setTimeout(() => resolve(number), 3000);
	});

	const myObservable = new Observable((observer) => {
		console.log('Iniciando Observable! ' + number); // 2
		number++;
		setTimeout(() => observer.next(number), 3000);
	}).pipe(share());

	myPromise.then((data) => console.log('Promise ' + data));
	myObservable.subscribe((data) => {
		number++;
		console.log('Observer ' + data);
	});

	setTimeout(() => {
		myPromise.then((data) => {
			number++;
			console.log('Promise ' + data);
		});
		myObservable.subscribe((data) => {
			number++;
			console.log('Observer ' + data);
		});
	}, 2000);

	number++;
	setTimeout(() => observer.next(number), 3000);
});

myPromise.then((data) => console.log('Promise ' + data));
myObservable.subscribe((data) => {
	number++;
	console.log('Observer ' + data);
});

setTimeout(() => {
	myPromise.then((data) => {
		number++;
		console.log('Promise ' + data); // não espera o timeout pra executar
	});
	myObservable.subscribe((data) => {
		number++;
		console.log('Observer ' + data);
	});
}, 2000);

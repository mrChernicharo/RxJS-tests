import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

let number = 0;
console.log(number);

// Promises tem comportamento Eager, o resolve roda uma vez só e é imediatamente executado em todos os .then()

// Observables executam o bloco de novo pra cada .subscribe()

// Promises compartilham seu estado com todas as inscrições
// Observables não
//
//   PROMISE   							 |    OBSERVABLE
// único valor 							 |  valores múltiplos
// execução imediata (Eager) |  execução sob demanda (Lazy)
// estado compartilhado 		 |  estado não compartilhado por padrão
// assíncrona  				  		 |  síncrona ou assíncrona
//
//

const myPromise = new Promise((resolve) => {
	console.log('Iniciando promise! ' + number);
	number++;
	setTimeout(() => resolve(number), 3000);
});

const myObservable = new Observable((observer) => {
	console.log('Iniciando Observable! ' + number);
	number++;
	setTimeout(() => observer.next(number), 3000);
}).pipe(share()); // <== o share fará o observable se comportar igual a promise

// isto é, os dois observers abaixo serão executados ao mesmo tempo

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

import { Observable } from 'rxjs';

// Promises tem comportamento Eager, o resolve roda uma vez só e é imediatamente executado em todos os .then()

// Observables executam o bloco de novo pra cada .subscribe()

// Promises compartilham seu estado com todas as inscrições
// Observables não
//
//   PROMISE   							 |    OBSERVABLE
// único valor 							 |  valores múltiplos
// execução imediata (Eager) |  execução sob demanda (Lazy)
// estado compartilhado 		 |  estado não compartilhado por padrão   (multicast | unicast)
// assíncrona  				  		 |  síncrona ou assíncrona
//
//

const myPromise = new Promise((resolve) => {
	console.log('Iniciando promise! '); // 1
	resolve(1);
});

const myObservable = new Observable((observer) => {
	console.log('Iniciando Observable! '); // 3
	observer.next(1); // 4
	observer.next(2); // 4
	observer.next(3); // 4
	observer.next(4); // 4
	observer.next(5); // 4
	observer.next(6); // 4
	setTimeout(() => observer.next(7), 2000); // 7
});

myPromise.then((data) => console.log('Promise ' + data)); // 6
console.log('Após Promise! '); // 2

myObservable.subscribe((data) => console.log('Observer ' + data)); // 3
console.log('Após Observable! '); // 5

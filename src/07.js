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
// não cancelável						 |  cancelável
//

const myPromise = new Promise((resolve) => {
	resolve(1);
});

const myObservable = new Observable((observer) => {
	let i = 0;
	const interval = setInterval(() => {
		console.log('leak' + i);
		observer.next(i++);
	}, 1000);

	return () => clearInterval(interval); // <== previnindo memory leak
});

myPromise.then((data) => console.log('Promise ' + data));
const subscription = myObservable.subscribe((data) => console.log('Observer ' + data));

setTimeout(() => {
	subscription.unsubscribe();
}, 5000);

import { Observable } from 'rxjs';

// stream -> fluxo de dados
// observable é um stream
// pra observar o stream, inscreva-se

// subjects são observables especiais

const myObservable = new Observable((observer) => {
	let num = 1;
	console.log('Iniciando Observable');
	const interval = setInterval(() => observer.next(num++), 1000);
	setTimeout(() => observer.error(new Error('erro!')), 3000);

	setTimeout(() => observer.complete(), 5000);
	return () => clearInterval(interval);
});

const subscription = myObservable.subscribe(
	(data) => console.log('Observer 1 ' + data),
	(err) => console.log(err),
	() => console.log('complete')
);

const subscription2 = myObservable.subscribe({
	next: (data) => console.log('Observer 2 ' + data),
	error: (err) => console.log(err),
	complete: () => console.log('complete'),
});

subscription.add(subscription2); // junta a subscription 1 com a 2 pra dar o unsubscribe junto

setTimeout(() => subscription.unsubscribe(), 6000);

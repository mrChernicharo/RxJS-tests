import { Subject } from 'rxjs';

// stream -> fluxo de dados
// observable é um stream
// pra observar o stream, inscreva-se

// subjects são observables especiais
// ao mesmo tempo que são observables são também observers
// portanto podemos nos inscrever e depois emitir .next() externamente

const subject = new Subject();

let i = 0;
const subscription = subject.subscribe(
	(data) => console.log('Observer 1: ' + data),
	(err) => console.log(err),
	() => console.log('complete')
);

const subscription2 = subject.subscribe({
	next: (data) => console.log('Observer 2: ' + data),
	error: (err) => console.log(err),
	complete: () => console.log('complete'),
});

const interval = setInterval(() => {
	subject.next(i++);
	console.log(i);
}, 1000);

subscription.add(subscription2); // junta a subscription 1 com a 2 pra dar o unsubscribe junto

setTimeout(() => {
	subscription.unsubscribe();
	clearInterval(interval);
}, 6000);

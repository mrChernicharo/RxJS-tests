import { defer, fromEvent, interval, of, from } from 'rxjs';
import { debounceTime, map, take, tap, throttleTime } from 'rxjs/operators';

// defer() cria observables a partir de uma function

console.log('------------------------------------------------------');

defer(() => {
	let a = Math.random() * 20;
	return a > 10 ? from([1, 2, 3]) : of(4, 5, 6);
}).subscribe((v) => console.log(v));

console.log('------------------------------------------------------');

const b = () =>
	defer(() => {
		return b > 10 ? from([1, 2, 3]) : of(4, 5, 6);
	});

b(2).subscribe((v) => console.log(v));

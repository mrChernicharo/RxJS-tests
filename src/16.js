import { of, from, interval, range, generate } from 'rxjs';
import { map, take } from 'rxjs/operators';

interval(1000) // gera números 0,1,2 ...
	.pipe(take(11))
	.subscribe((v) => console.log(v));

console.log('------------------------------------------------------');

const arr = [100, 200, 300, 400];

interval(1000)
	.pipe(take(4))
	.subscribe((v) => console.log(arr[v]));

console.log('------------------------------------------------------');

// range(20, 4) a partir do 20, emita 4 valores
range(20, 10).subscribe((v) => console.log(v));

console.log('------------------------------------------------------');

// generate é igual o for, porém respeitando a imutabilidade
// generate(0, x => x < 10, x => x + 1)

generate(
	0, // valor inicial
	(x) => x < 10, // condição
	(x) => x + 1 // incremento
).subscribe((v) => {
	if (v === 0) {
		console.log('generate é um for');
	}
	console.log(v);
});

console.log('------------------------------------------------------');

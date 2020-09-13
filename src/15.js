import { of, from, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

of(1, true, 'hello', [1, 2, 3]).subscribe((v) => console.log(v));

from([1, 2, 3]).subscribe((v) => console.log(v));

console.log('------------------------------------------------------');

let i = 1;
function* gen() {
	while (true) {
		yield i++;
	}
}

from(gen())
	.pipe(take(4))
	.subscribe((v) => console.log(v));

console.log('------------------------------------------------------');

from(of(1, 2, 3, 4, 5))
	.pipe(map((v) => v * 2))
	.subscribe((v) => console.log(v));

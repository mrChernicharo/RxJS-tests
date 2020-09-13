import { of, from, bindCallback, bindNodeCallback } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

// defer() cria observables a partir de uma function

console.log('------------------------------------------------------');

const foo = (a, cb) => {
	return cb(a);
};

bindCallback(foo)(10).subscribe((v) => console.log(v));
bindCallback(foo)('heeey').subscribe((v) => console.log(v));

console.log('------------------------------------------------------');
// os callbacks do node recebem dois ars, sendo q o primeiro é um erro

const baz = (a, cb) => {
	// return cb(undefined, a);  // ok
	return cb(new Error('erroooorrr'), a);
};

bindNodeCallback(baz)(10).subscribe((v) => console.log(v));

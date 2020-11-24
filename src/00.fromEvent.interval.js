import { fromEvent, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const button = document.createElement('button');
button.innerHTML = `<span>Click Me</span>`;
document.body.appendChild(button);

const event$ = fromEvent(button, 'click');
const interval$ = interval(1000);

// cria uma inscrição nova a cada click ---> confusão geral no console!

// event$.subscribe((val) => {
// 	interval$.subscribe((val) => console.log(val));
// });

event$
	.pipe(
		switchMap((event) => {
			return interval$;
		})
	)
	.subscribe((val) => console.log(val));

// com switchMap, cada nova inscrição cancela a anterior!

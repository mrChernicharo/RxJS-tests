import { fromEvent, interval } from 'rxjs';
import { debounceTime, map, take, tap, throttleTime } from 'rxjs/operators';

const body = document.getElementById('body');
const btn = document.createElement('button');
const input = document.createElement('input');
btn.innerHTML = 'Aperta Aqui';
body.append(input, btn);

// MUITO LEGAL O FROMEVENT!
// Ele te permite transformar eventos JS em observables
// Assim vc pode programar direitinho a maneira de reagir a esses eventos

const subs = fromEvent(btn, 'click').subscribe((v) => console.log(v));

fromEvent(input, 'input')
	.pipe(
		// tap((v) => console.log(v)),
		debounceTime(1000)
	)
	.subscribe((v) => {
		console.log(v.target.value);
	});

// com isso aqui o botão para de funcionar após 3 seg
interval(1000).subscribe((v) => {
	if (v > 3) {
		subs.unsubscribe();
	}
});

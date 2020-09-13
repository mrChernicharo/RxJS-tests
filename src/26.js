import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, map, pluck, switchMap } from 'rxjs/operators';

const input = document.querySelector('input');
const inputObs = fromEvent(input, 'input');
const ul = document.querySelector('ul');

const showResults = (res) => {
	ul.innerHTML = res.map((item) => `<li>${item}</li>`).join('');
};

const serarchCountries = (termo) => {
	return ajax(`https://restcountries.eu/rest/v2/name/${termo}?fields=name`).pipe(
		pluck('response'),
		map((res) => res.map((e) => e.name))
	);
};

inputObs
	.pipe(
		debounceTime(300),
		pluck('target', 'value'),
		map((e) => e.trim()),
		switchMap((termo) => serarchCountries(termo))
	)
	.subscribe(showResults);

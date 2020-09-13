import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, tap, map, pluck, switchMap, catchError } from 'rxjs/operators';

const input = document.querySelector('input');
const inputObs = fromEvent(input, 'input');
const ul = document.querySelector('ul');

const showResults = (res) => {
	ul.innerHTML = res.map((item) => `<li><span>${item}</span></li>`).join('');
};

const serarchCountries = (termo) =>
	// return ajax(`https://restcountries.eu/rest/v2/name/${termo}?fields=name`).pipe(
	ajax(`https://restcountries.eu/rest/v2/name/${termo}?fields=name`).pipe(
		tap((e) => console.log(e)),
		pluck('response'),
		map((res) => res.map((e) => e.name))
	);

inputObs
	.pipe(
		debounceTime(300),
		pluck('target', 'value'),
		map((e) => e.trim()),
		switchMap(serarchCountries),
		// switchMap((termo) => serarchCountries(termo))
		catchError((err, source) => {
			console.log(err);
			return source;
		})
	)
	.subscribe(showResults);

// resolvemos com catchError
// o catchError nos permite receber respostas de erro sem matar o stream

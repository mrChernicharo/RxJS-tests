import { fromEvent, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
	debounceTime,
	tap,
	map,
	pluck,
	switchMap,
	exhaustMap,
	concatMap,
	mergeMap,
	catchError,
	startWith,
	distinctUntilChanged,
} from 'rxjs/operators';

const input = document.querySelector('input');
const inputObs$ = fromEvent(input, 'input');
const ul = document.querySelector('ul');

const showResults = (res) => {
	ul.innerHTML = res.map((item) => `<li><span>${item}</span></li>`).join('');
};

const serarchCountries = (termo) => {
	return ajax(`https://restcountries.eu/rest/v2/name/${termo}?fields=name`).pipe(
		tap((e) => console.log(e)),
		pluck('response'), // map(data => data.response)
		map((res) => res.map((e) => e.name))
	);
};

inputObs$
	.pipe(
		debounceTime(1000),
		pluck('target', 'value'),
		map((e) => e.trim()),
		distinctUntilChanged(), // <-- bloqueia a emissão de novo valor caso não haja mudanças
		switchMap((termo) => {
			return !termo || termo.length < 3 ? of([]) : serarchCountries(termo);
		}),
		catchError((err, source) => {
			console.log(err);
			return source.pipe(startWith([]));
		})
	)
	.subscribe(showResults);

// se tivermos menos de 3 caracteres, ou um undefined
// não vamos disparar requisição nenhuma
// e simplesmente retornar um array vazio
// mantendo o stream vivo

// com distinctUntilChanged, agora se a gente digita, apaga e põe o mesmo valor
// rapidamente, o valor não passa no stream e não ocorre uma nova chamada à API

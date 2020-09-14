import { of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const api = (response, delay) =>
	ajax({
		url: `http://localhost:5200/response/${JSON.stringify(response)}/delay/${delay}`,
	});

const a = api({ data: 'A' }, 500);
const b = api({ data: 'B' }, 1000);
const c = api({ data: 'C' }, 1500);
const d = api({ data: 'D' }, 2000);
const e = api({ data: 'E' }, 2500);
const f = api({ data: 'F' }, 3000);
const g = api({ data: 'G' }, 3500);
const h = api({ data: 'H' }, 4000);
const i = api({ data: 'I' }, 4500);
const j = api({ data: 'J' }, 5000);
const k = api({ data: 'J' }, 6000);

of(a, b, c, d, e, f, g, h, i, j, k)
	.pipe(mergeMap((val) => val))
	.subscribe(
		(x) => console.log(x),
		(error) => console.log(error),
		() => console.log('complete')
	);

import { concat, merge, of } from 'rxjs';
import {
	concatMap,
	map,
	mergeMap,
	pluck,
	switchMap,
	exhaustMap,
	tap,
	combineAll,
} from 'rxjs/operators';
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

// merge(a, b, c, d, e, f, g, h, i, j, k)  // concat(a, b, c, d, e, f, g, h, i, j, k)

of(a, b, c, d, e, f, g, h, i, j, k)
	.pipe(
		mergeMap((val) => val), //retorna objetos tipo Ajax Response
		// concatMap((val) => val),
		// switchMap((val) => val),
		// exhaustMap((val) => val),
		// mergeMap((val) => val, 2),
		pluck('response', 'data'),
		combineAll()
	)

	.subscribe(
		(x) => console.log(x),
		(error) => console.log(error),
		() => console.log('complete')
	);

// MergeMap => executa todas as requisições ao mesmo tempo na medida do possível. Conforme as primeiras vão concluindo ele vai disparando as que faltam
// ConcatMap => envia uma requisição por vez. Só envia a seguinte quando a primeira concluiu
// SwitchMap => chama todas mas não espera: se tem mais pra chamar, ele cancela a atual e chama a próxima, cancela e chama a próxima, cancela e chama a próxima, até chegar na última, que é a única que ele deixa completar
// exhaustMap => ao contrário do switchMap, essa mantém apenas a primeira requisição e não dispara as demais. Enquanto a atual estiver executando, todas as demais são ignoradas.

// * exhaustMap é útil pra formulários, pra evitar que o usuário mande o mesmo form várias vezes se ele socar o botão várias vezes
// * mergeMap pode ter seu máximo de paralelismo limitado. =>  mergeMap((val) => val, 3)  <== só dispara um máximo de 3 reqs simultânes

// vai cancelando a atual e chama a próxima

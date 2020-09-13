import { fromEvent } from 'rxjs';
import { throttleTime, switchMap, takeUntil, tap } from 'rxjs/operators';

const body = document.querySelector('#body');
const card = document.createElement('div');
card.style.cssText = `position: absolute; width: 300px; height: 200px;
	background-color: #42df98; box-shadow: #333 3px 3px 5px;
	cursor: grab`;

body.append(card);

// fromEvent(card, 'mouseover').subscribe((v) => console.log(v));
// fromEvent(card, 'mousemove').subscribe((v) => console.log(v));

// armazena observables criadas a partir dos eventos ...
const mounseDown$ = fromEvent(card, 'mousedown');
const mouseUp$ = fromEvent(card, 'mouseup');
const mouseMove$ = fromEvent(card, 'mousemove');

const dragAndDrop = mounseDown$
	.pipe(
		switchMap((start) =>
			mouseMove$.pipe(
				throttleTime(100),
				tap((e) => console.log([e.x, e.y])),
				takeUntil(mouseUp$)
			)
		)
	)
	.subscribe();

// queremos escutar os eventos de mouseMove a pratir do momento em que tivermos um mouseDown
// vamos ler a posição do mouse e transferir ela pro card até que o evento mouseUp aconteça

// switchMap -> tem o poder de trocar de observable cada vez que uma nova emissão acontece
// com switchMap, ao iniciar um novo stream, automaticamente paramos de escutar o stream anterior
// ou seja, ele se inscreve e cancela a inscrição anterior automaticamente

// takeUntil, premanecemos escutando o stream até que o evento passado por parametro ocorra

// const dragAndDrop = mounseDown$.pipe( // me inscrevo quando rolar mouseDown$
// 	switchMap(start => mouseMove$.pipe(  // fico escutando o mouseMove$
// 		takeUntil(mouseUp$)                // até que aconteça um mouseUp$
// 	))
// )

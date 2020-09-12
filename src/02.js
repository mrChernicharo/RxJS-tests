import { Observable } from 'rxjs';

let number = 0;

const myPromise = new Promise((resolve) => {
	console.log('Iniciando promise!');
	setTimeout(() => resolve('resolved ' + number), 1000);
});

// setInterval(() => {
// 	myPromise.then((data) => console.log(data));
// }, 1000);

myPromise.then((data) => {
	console.log(data);
	number++;
});

setTimeout(
	() =>
		myPromise.then((data) => {
			console.log(data);
			number++;
		}),
	2000
);

setTimeout(
	() =>
		myPromise.then((data) => {
			console.log(data);
			number++;
		}),
	3000
);

// const observable = new Observable((observer) => {
// 	setInterval(() => {
// 		observer.next();
// 	}, 1000);
// });
// observable._subscribe((data) => {
// 	console.log(data);
// });

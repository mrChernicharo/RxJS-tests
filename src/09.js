import { interval, Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';

const data = {
	users: [
		{ name: 'Mari', age: 30 },
		{ name: 'Felipe', age: 33 },
		{ name: 'Vinicius', age: 32 },
	],
	products: [
		{ name: 'laptop', price: 3499.9, image: '💻' },
		{ name: 'shirt', price: 110.0, image: '🎽' },
		{ name: 'ball', price: 80.95, image: '⚽️' },
		{ name: 'icecream', price: 7.0, image: '🍦' },
		{ name: 'kimono', price: 7.0, image: '🥋' },
	],
};

const body = document.getElementById('body');

const header = document.createElement('header');
const h1 = document.createElement('h1');

h1.innerText = 'Holla!';

header.appendChild(h1);
body.appendChild(header);

let i = 0;
// let interval = setInterval(() => {

const myObs = new Observable((observer) => {
	const interval = setInterval(() => {
		const product = createProduct(data, i);
		observer.next(product);
		if (i == data.products.length) {
			clearInterval(interval);
		}
	}, 1000);
});

const subs = myObs.subscribe({
	next: (data) => i++,
});

function createProduct(data, index) {
	const article = document.createElement('article');
	const title = document.createElement('h3');
	const price = document.createElement('span');
	const img = document.createElement('p');
	title.innerText = data.products[index].name;
	price.innerText = data.products[index].price;
	img.innerText = data.products[index].image;
	article.appendChild(title);
	article.appendChild(price);
	article.appendChild(img);
	body.appendChild(article);
}

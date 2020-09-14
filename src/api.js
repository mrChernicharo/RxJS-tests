// import http from 'http';
const http = require('http');

http
	.createServer((request, response) => {
		response.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		});

		// http://localhost:5200/response/{"data": "hello world"}/delay/1000/ -> http://localhost:5200/response/%7B%22data%22:%20%22hello%20world%22%7D/delay/1000/
		const matchURL = /^\/response\/(.+)\/delay\/(\d+)\/?$/;

		if (!matchURL.test(request.url)) {
			return response.end();
		}
		const [, resp, delay] = matchURL.exec(request.url); // {url, res, delay}
		const jsonResponse = decodeURIComponent(resp);

		setTimeout(() => {
			response.write(jsonResponse);
			response.end();
		}, +delay);
	})
	.listen(5200);

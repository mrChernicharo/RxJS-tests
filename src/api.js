// import http from 'http';
const http = require('http');

http
	.createServer((request, response) => {
		response.writeHead(200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		});

		const matchURL = /^\/response\/(.+)\/delay\/(\d+)\/?$/;
		// http://localhost:5200/response/{"data": "hello world"}/delay/1000/
		if (!matchURL.test(request.url)) {
			return response.end();
		}
		const [, resp, delay] = matchURL.exec(request.url); // {url, res, delay}
		const jsonResponse = decodeURIComponent(resp);

		setTimeout(() => {
			response.write(jsonResponse);
			response.end();
		}, 1000);
	})
	.listen(5200);

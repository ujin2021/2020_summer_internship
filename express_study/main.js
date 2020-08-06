var express = require('express') // const : 상수(변하지 않는다)
var app = express()
var fs = require('fs');
var template = require('./template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');
/*
// app.get(경로, callback)
app.get('/', (req, res) => {
	 res.send('Hello World!')
})
*/
// node.js 의 if문을 app.get으로 쓴다
app.get('/', function(request, response){ // root url
	fs.readdir('./data', function(error, filelist){
		var title = 'Welcome';
		var description = 'Hello, Node.js';
		var list = template.list(filelist);
		var html = template.HTML(title, list,
				`<h2>${title}</h2>${description}`,
				`<a href="/create">create</a>`
				);
		response.send(html);
	});
});

app.get('/create', function(request, response){ // get 방식
	fs.readdir('./data', function(error, filelist){
		var title = 'WEB-CREATE';
		var list = template.list(filelist);
		var html = template.HTML(title, list, `
				<form action="/create_process" method="post">
				<p><input type="text" name="title" placeholder="title"></p>
				<p>
					<textarea name="description" placeholder="description"></textarea>
				</p>
				<p>
					<input type="submit">
				</p>
				</form>`,'');
		response.send(html);
	});
});

app.post('/create_process', function(request, response){ //post 방식(/create로 해도됨)
	var body = '';
	request.on('data', function(data){
		body = body + data;
	});
	request.on('end', function(){
		var post = qs.parse(body);
		var title = post.title;
		var description = post.description;
		fs.writeFile(`data/${title}`, description, 'utf8', function(err){
			response.writeHead(302, {Location: `/`});
			response.end();
		});
	});
});

app.get('/page/:pageId', function(request, response){
	fs.readdir('./data', function(error, filelist){
		var filteredId = path.parse(request.params.pageId).base;
		fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
			var title = request.params.pageId;
			var sanitizedTitle = sanitizeHtml(title);
			var sanitizedDescription = sanitizeHtml(description);
			var list = template.list(filelist);
			var html = template.HTML(sanitizedTitle, list, 
					`<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
					`<a href="/create">create</a>
					 <a href="/update?id=${sanitizedTitle}">update</a>
					 <form action="delete_process" method="post">
					 	<input type="hidden" name="id" value=${sanitizedTitle}">
						<input type="submit" value="delete">
					 </form>`
				);
			response.send(html);
		});
	});
});

app.listen(3000, function(){
	console.log('Example app listening on port 3000');
});

/*
// module
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
	    var _url = request.url;
		var queryData = url.parse(_url, true).query;
		var pathname = url.parse(_url, true).pathname;
		console.log(url.parse(_url,true)); //확인해보면 pathname은 /이다 
	
		if(pathname === '/'){ // 정상적인 페이지를요청하면
			console.log(queryData.id);
			if(queryData.id === undefined){ // home 일때
				fs.readdir('./data', function(error, filelist){ //file list 가져오기
					console.log(filelist);
					var title = 'Welcome';
					var description = 'Hello, Node.js';
					//여기서 정의한 title과 description이 밑의 html안의 변수에 들어간다.

					var list = template.list(filelist);	
					var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`); // root page는 update가 필요없다
					response.writeHead(200);//정상적인 페이지
					response.end(html);
				});
			}
			else{
				fs.readdir('./data', function(error, filelist){
					var filteredId = path.parse(queryData.id).base;
					fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
						var title = queryData.id;
						var sanitizedTitle = sanitizeHtml(title);
						var sanitizedDescription = sanitizeHtml(description);
						var list = template.list(filelist);	
						var html = template.HTML(title, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`, 
								`<a href="/create">create</a> 
								<a href="/update?id=${sanitizedTitle}">update</a>
								<form action="delete_process" method="post">
									<input type="hidden" name="id" value="${sanitizedTitle}">
									<input type="submit" value="delete">
								</form>`);
						response.writeHead(200);
						response.end(html);
					});
				});
			}	
		}
		else if(pathname === '/create'){	
			fs.readdir('./data', function(error, filelist){ //file list 가져오기
				console.log(filelist);
				var title = 'Welcome';
				var list = template.list(filelist);	
				var html = template.HTML(title, list, `
						<form action="http://13.124.208.47:3000/create_process" method="post">
							<p><input type="text" name="title" placeholder="title"></p>
							<p>
								<textarea name="description" placeholder="description"></textarea>
							</p>
							<p>
								<input type="submit">
							</p>
						</form>
					` ,'');
				response.writeHead(200);//정상적인 페이지
				response.end(html);
			});
		}
		else if(pathname === '/create_process'){
			var body = '';
			// createServer callback 함수의 request
			request.on('data', function(data){
				body += data; // callback이 실행될 때마다 data를 추가
			});
			request.on('end', function(){
				// 더이상 들어오는 data가 없을 때 -> 수신이 끝났다
				var post = qs.parse(body); // post 안에 post data가 들어있을 것이다
				console.log(post);
				var title = post.title;
				var description = post.description;
				fs.writeFile(`data/${title}`, description, 'utf8', function(err){
				response.writeHead(302, {Location: `/?id=${title}`}); //302 : redirect
				response.end('success');
				});
			});
		}
		else if(pathname === '/update'){
			fs.readdir('./data', function(error, filelist){
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
					var title = queryData.id;
					var list = template.list(filelist);
					var html = template.HTML(title, list, 
							`<form action="/update_process" method="post">
							<input type="hidden" name="id" value="${title}"> <!-- 제목이 수정될 수 있으니까 id를 원래 제목으로 고정시키기 위해서-->
							<p><input type="text" name="title" placeholder="title" value="${title}"></p>
							<p>
								<textarea name="description" placeholder="description">${description}</textarea>
							</p>
							<p>
								<input type="submit">
							</p>
							</form>`,'');
					response.writeHead(200);
					response.end(html);
				});
			});
		}
		else if(pathname === '/update_process'){
			var body = '';
			// createServer callback 함수의 request
			request.on('data', function(data){
				body += data; // callback이 실행될 때마다 data를 추가
			});
			request.on('end', function(){
				// 더이상 들어오는 data가 없을 때 -> 수신이 끝났다
				var post = qs.parse(body); // post 안에 post data가 들어있을 것이다
				var id = post.id;
				var title = post.title;
				var description = post.description;
				fs.rename(`data/${id}`, `data/${title}`, function(error){
					fs.writeFile(`data/${title}`, description, 'utf8', function(err){
						response.writeHead(302, {Location: `/?id=${title}`});
						response.end('success');
					});
				});
			});
		}
		else if(pathname === '/delete_process'){
			var body = '';
			// createServer callback 함수의 request
			request.on('data', function(data){
				body += data; // callback이 실행될 때마다 data를 추가
			});
			request.on('end', function(){
				// 더이상 들어오는 data가 없을 때 -> 수신이 끝났다
				var post = qs.parse(body); // post 안에 post data가 들어있을 것이다
				var id = post.id;
				var filteredId = path.parse(id).base;
				fs.unlink(`data/${filteredId}`, function(err){
					response.writeHead(302, {Location:`/`});
					response.end();
				});

			});
		}
		else{
			response.writeHead(404);
			response.end('Not found');
		}
});
app.listen(3000);
*/

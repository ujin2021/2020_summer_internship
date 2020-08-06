// module
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
	return `
	<html>
	<head>
  	<title>${title}</title>
    <meta charset="utf-8">
	</head>
	<body>
		<h1><a href="/">WEB</a></h1>
		${list}
		${control}
		${body}
	</body>
	</html>`;
}

function templateList(filelist){	
	var list = '<ul>';
	var i = 0;
	while(i < filelist.length){ //파일 갯수 만큼
		list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
		i++;
	}
	list += '</ul>';
	return list;
}
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
					var list = templateList(filelist);	
					var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`); // root page는 update가 필요없다
					response.writeHead(200);//정상적인 페이지
					response.end(template);
				});
			}
			else{
				fs.readdir('./data', function(error, filelist){
					console.log(filelist);
					var title = 'Welcome';
					var description = 'Hello, Node.js';
					fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
						var title = queryData.id;
						var list = templateList(filelist);	
						var template = templateHTML(title, list, `<h2>${title}</h2>${description}`, 
								`<a href="/create">create</a> 
								<a href="/update?id=${title}">update</a>
								<form action="delete_process" method="post">
									<input type="hidden" name="id" value="${title}">
									<input type="submit" value="delete">
								</form>`);
						response.writeHead(200);
						response.end(template);
					});
				});
			}	
		}
		else if(pathname === '/create'){	
			fs.readdir('./data', function(error, filelist){ //file list 가져오기
				console.log(filelist);
				var title = 'Welcome';
				var list = templateList(filelist);	
				var template = templateHTML(title, list, `
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
				response.end(template);
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
				fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
					var title = queryData.id;
					var list = templateList(filelist);
					var template = templateHTML(title, list, 
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
					response.end(template);
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
				fs.unlink(`data/${id}`, function(err){
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

// module
var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
	    var _url = request.url;
		var queryData = url.parse(_url, true).query;
		var pathname = url.parse(_url, true).pathname;

		// console.log(url.parse(_url,true));확인해보면 pathname은 /이다 
	
		if(pathname === '/'){ // 정상적인 페이지를요청하면
			if(queryData.id === undefined){ // home 일때
				fs.readdir('./data', function(error, filelist){ //file list 가져오기
					console.log(filelist);
					var title = 'Welcome';
					var description = 'Hello, Node.js';
					//여기서 정의한 title과 description이 밑의 html안의 변수에 들어간다.
					var list = '<ul>';
					var i = 0;
					while(i < filelist.length){ //파일 갯수 만큼
						list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
						i++;
					}

					list += '</ul>';
				
					var template = `
						<html>
						<head>
  						<title>${title}</title>
    					<meta charset="utf-8">
						</head>
						<body>
		  					<h1><a href="/">WEB</a></h1>
						 	${list}
							<h2>${title}</h2>
							 <p>${description}</p>
						</body>
						</html>`;
					response.writeHead(200);//정상적인 페이지
					response.end(template);
				});
			}
			else{
				fs.readdir('./data', function(error, filelist){
					console.log(filelist);
					var title = 'Welcome';
					var description = 'Hello, Node.js';
					var list = '<ul>';
					var i = 0;
					while(i < filelist.length){
						list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
						i++;
					}

					list += '</ul>';
					fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
						var title = queryData.id;
						var template = `
							<html>
							<head>
								<title>WEB1 - ${title}</title>
								<meta charset="utf-8">
							</head>
							<body>
								<h1><a href="/">WEB</a></h1>
								${list}
								<h2>${title}</h2>
								<p>${description}</p>
							</body>
							<html>`;
						response.writeHead(200);
						response.end(template);
					});
				});
			}	
		}
		else{
			response.writeHead(404);
			response.end('Not found');
		}
});
app.listen(3000);

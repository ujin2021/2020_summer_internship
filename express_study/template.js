// template object
module.exports = {
	HTML : function (title, list, body, control){
	return `
	<html>
	<head>
  	<title>${title}</title>
    <meta charset="utf-8">
	</head>
	<body>
		<h1><a href="/">-WEB- </a></h1>
		${list}
		${control}
		${body}
	</body>
	</html>`;},
	list : function (filelist){	
		var list = '<ul>';
		var i = 0;
		while(i < filelist.length){ //파일 갯수 만큼
			list += `<li><a href="/page/${filelist[i]}">${filelist[i]}</a></li>`;
			i++;
		}
		list += '</ul>';
		return list;
	}
}

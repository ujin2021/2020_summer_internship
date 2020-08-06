var fs = require('fs');

/*
// readFileSync

console.log('A');
var result = fs.readFileSync('sample.txt', 'utf8');
console.log(result);
console.log('C');

ABC
*/

console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){
	// file의 내용을 콜백함수의 result에 넣어준다.
	console.log(result);
});
console.log('C');

// ACB

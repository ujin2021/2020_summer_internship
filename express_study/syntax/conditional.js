var args = process.argv;
// [0] : node의 위치
// [1] : 실행시킨 파일의 위치
// [2] : 입력한 문자

console.log(args[2]);
console.log('A');
console.log('B');
if(args[2]==='youjin'){
	console.log('C1');
}
else{
	console.log('C2');
}
console.log('D');

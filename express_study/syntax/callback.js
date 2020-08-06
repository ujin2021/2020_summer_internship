/*
function a(){
	console.log('A');
}
*/

var a = function(){
	console.log('A');
} // js에서는 함수가 값이다
a();

function slowfunc(callback){
	callback();
}

slowfunc(a);

// slowfunc의 인자에 a가 들어가는데 a는 함수니까
// slowfunc안에서 callback();은 a를 실행시킨다.

// array, object, function(구문인동시에 값이다. 값-> 변수에 넣을 수 있다)
var f = function() {
	console.log(1+1);
	console.log(1+2);
}
console.log(f); // 함수는 값이 될 수 있다.
f(); //실행

// 배열의 원소로서 함수가 존재할 수 있다.
var a = [f]
console.log('a: ',a);
a[0]();

var o = {
	func:f
}// 객체에 담을 수 있다.
o.func();

// var i = if(true){console.log(1)}; 조건문은 값이 될 수 없다.
// var w = while(true){console.log(1)}; 반복문도 값이 될 수 없다.




// 변수를 정리해서 객체에 넣어둔다.
var o = {
	v1:'v1',
	v2:'v2',
	f1: function(){
		console.log(this.v1);
	},
	f2 : function(){
		console.log(this.v2);
	}
}
// this : 객체 내의 함수가 같은 객체 안의 값을 참조하려고할때 쓴다.(this를 사용못하면 어떤 값의 이름을 미리 알고있어야함.
// 객체 : 서로 연관되어있는것들을 묶어놓는다.
/*
function f1(){
	console.log(o.v1);
}

function f2(){
	console.log(o.v2);
}

f1();
f2();
*/

o.f1();
o.f2();

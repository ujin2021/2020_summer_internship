// module
var M = require('./mpart.js');
/*
var M = {
	v : 'v',
	f:function(){
		console.log(this.v);
	}
}
*/
console.log(M); // {v:'v',f:[function:f]}
M.f();

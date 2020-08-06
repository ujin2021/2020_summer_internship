var M = {
	v : 'v',
	f:function(){
		console.log(this.v);
	}
}

module.exports = M;
// 이 파일 밖에서도 M객체를 쓸 수 있도록 해주겠다

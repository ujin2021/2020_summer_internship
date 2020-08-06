// array
var members = ['youjin', '21', 'hufs'];
console.log(members[1]); // kbs
var i = 0;
while(i < members.length){
	console.log('array loop',members[i]);
	i++;
}

// object
var roles = {
	'name' : 'youjin',
	'age' : '21',
	'univ' : 'hufs'
}
console.log(roles.name);

for (var name in roles){
	console.log('object ==> ', name); // name, age, univ
	console.log('value ==> ', roles[name]); // youjin, 21, hufs
}

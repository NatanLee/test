async function start(){
	return await Promise.resolve('asunc is working');	
}
start().then(console.log);

const unused = 11;

class Util {
	static id = Date.now();	
}
//не работает
/* import('lodash').then((l) => {
	console.log('Lodash', l.random(0, 42, true));
}) */

console.log('Util ID:', Util.id);
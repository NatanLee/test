async function start(){
	return await Promise.resolve('asunc is working');	
}
start().then(console.log);

class Util {
	static id = Date.now();	
}

console.log('Util ID:', Util.id);
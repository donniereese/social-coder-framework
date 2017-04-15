var utf8 = require('utf8');

console.log('Unicode: ');
console.log('\uD800\uDC01');

console.log('- - - ');

console.log( '\uD800\uDC01'.length );

console.log('\n\n\n');


console.log('UTF-8: ');
console.log(utf8.encode('\uD800\uDC01'));

console.log('- - - ');

console.log( utf8.encode('\uD800\uDC01').length );

console.log('\n\n\n');

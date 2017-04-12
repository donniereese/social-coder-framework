const fs = require('fs');
const term = require('window-size');
const pm = require('./process_manager.js');
const readline = require('readline');

const process_manager = new pm();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});


// process_manager.on('event', console.log);
// process_manager.start({name: 'test'});


rl.prompt();

rl.on('line', (line) => {

    switch(line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        default:
            console.log(`Say what? I might have heard '${line.trim()}'`);
            break;
    }

    readline.cursorTo(rl, 0, 0);uin
    rl.write('\u250C');
    rl.write('\u2500');

    readline.cursorTo(rl, 0, term.height-1);
    rl.prompt();

}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});




var drawBox = function(text) {

};

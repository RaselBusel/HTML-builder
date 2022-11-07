
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let pathFull = path.join(__dirname, 'data.txt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// We can use fs.writeFile
fs.appendFile(pathFull, '', function (err) {
    if (err) throw err;
  });

rl.setPrompt('Please type some phrase!\n')
rl.prompt();

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close();
        console.log('\nHave a nice day!');
    } else {
        fs.appendFile(pathFull, (input + '\n'), function (err) {
            if (err) throw err;
          });
        console.log('Please type some again:')
    }
});

rl.on('SIGINT', () => {
    console.log('\nHave a nice day!');
    rl.close();
});

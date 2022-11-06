
const fs = require('fs');
const path = require('path');

let pathFull = path.join(__dirname, 'text.txt');

const { stdout } = process;

const readableStream = fs.createReadStream(pathFull, 'utf8');
readableStream.on('data', chunk => stdout.write(chunk));

//readableStream.on('data', chunk => console.log(chunk));

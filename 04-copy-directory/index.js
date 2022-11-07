
//Attention!
//EPERM while renaming directory in nodeJS randomly
//EPERM-error in some tests for Win10 machine
//https://github.com/nodejs/node/issues/29481
//Script full work

const path = require('path');
const fs = require('fs');

const { mkdir, readdir, copyFile, rm, rename } = require('fs/promises');
const { join } = require('path');

let pathSrc = join(__dirname, '/files/');
let pathDist = join(__dirname, '/files-copy/');
let pathTemp = join(__dirname, '/files-temp/');

const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('endDelDir', () => console.log('DIR deleted'));
emitter.on('endCheckDir', () => makeDirectory());
emitter.on('endCopyDir', () => console.log('DIR copyed'));
emitter.on('endCopyDir', () => renameFolder());


delDirectory();
readDirectory();

function delDirectory () {
  fs.access(pathDist, fs.constants.F_OK, err => {
    console.log(`${err ? 'DIR does not exist' : 'DIR exists'}`);
    if (!err) {
      console.log('1');
      rm(pathDist,{recursive: true, force: true }, (err) => {
        if (err) console.log(err);
      })
      console.log('1.1');
      emitter.emit('endDelDir');
    }
  })
  emitter.emit('endCheckDir');
}



function makeDirectory () {
  mkdir(pathTemp, { recursive: true });
  console.log('2');
}

function readDirectory () {
  let files = readdir(pathSrc)
	.then(files => {
		for (let file of files) {
      console.log('3');
      copyFile(pathSrc + file, pathTemp + file);
		}
    emitter.emit('endCopyDir')
	})
	.catch( err => {
		console.log(err)
	})
}

//renameFolder()

 function renameFolder() {
  fs.rename(pathTemp, pathDist, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully renamed the folder.")
    }
  })
}

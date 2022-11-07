const path = require('path');
const fs = require('fs');
const { stdout } = process;


let pathFull = path.join(__dirname, '/secret-folder');
fs.promises.readdir(pathFull, {withFileTypes: true})

	.then(filenames => {
		for (let filename of filenames) {
        if (!filename.isDirectory()) {
            let fileNameFull = filename.name;
            fs.stat(path.join(pathFull, `${fileNameFull}`), (error, stats) => {
                if (error) {
                  console.log(error);
                }
                else {
                  stdout.write(
                    `${fileNameFull.slice(0, fileNameFull.indexOf('.'))} - ` +
                    `${path.extname(fileNameFull).slice(1)} - ` +
                    `${stats.size * 0.001} kb\n`
                  );
                }
            })
            //console.log
        }
		}
	})

	.catch(err => {
		console.log(err)
	})



//console.log(typeof fileNameFull);
//console.log(filenames);
//console.log(fileNameFull.slice(0, fileNameFull.indexOf('.')));
//console.log(path.extname(fileNameFull).slice(1))
//console.log("Size:", fileSize);
//console.log(' ');

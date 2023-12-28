const start = (app) => {
    app.get('/api/getFiles', (request, response) => {
        const path = require('path');
        const fs = require('fs');
        //joining path of directory 
        const directoryPath = path.join(__dirname, '../../public');


        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            let fileList = [];

            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file);
                fileList.push(file);
            });
            response.send(fileList);
        });
    });
};

module.exports = { start };
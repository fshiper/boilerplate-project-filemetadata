'use strict';
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// const bodyParser = require('body-parser'); //connects bodyParsing middleware
// const formidable = require('formidable');
// const path = require('path');     //used for file path
// const fs = require('fs-extra');    //File System-needed for renaming file etc

// require and use "multer"...

const app = express();
app.use(fileUpload());

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.post('/api/fileanalyse', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } 
  let upFile = req.files.upfile
  let fileDetails = {
    name: upFile.name,
    type: upFile.mimetype,
    size: upFile.size
  }
  res.status(200).json(fileDetails)
})

// app.use(bodyParser({defer:true}));
// app.route('/api/fileanalyse')
//    .post((req, res) => {
//       const form = new formidable.IncomingForm();
//       form.uploadDir = "./img";       //set upload directory
//       form.keepExtensions = true;     //keep file extension

//       form.parse(req, (err, fields, files) => {
//         res.writeHead(200, {'content-type': 'text/plain'});
//         res.write('received upload:\n\n');
//         console.log("form.bytesReceived");
//         //TESTING
//         console.log("file size: "+JSON.stringify(files.fileUploaded.size));
//         console.log("file path: "+JSON.stringify(files.fileUploaded.path));
//         console.log("file name: "+JSON.stringify(files.fileUploaded.name));
//         console.log("file type: "+JSON.stringify(files.fileUploaded.type));
//         console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

//         //Formidable changes the name of the uploaded file
//         //Rename the file to its original name
//         fs.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
//           if (err)
//               throw err;
//             console.log('renamed complete');  
//         });
//         res.end();
//       })
//     })

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

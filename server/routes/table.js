var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res) => {
// req.session.name = req.session.name || new Date().toUTCString()
// console.log(req.sessionID);
// fs.readdir('../data/', (err, files) => {
//   files.forEach(file => {
    fs.open('./server/data/data.js', 'r', function(err, fileToRead){
      if(err){
        console.log(err);
      }
      else{
        console.log(fileToRead, 'fileToRead');
        fs.readFile('./server/data/data.js', function(err, data) {
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.write(data);
         // res.write(JSON.stringify(req.sessionID));
         res.end();
       });
      }
    })
//   });
// })


})

module.exports = router;

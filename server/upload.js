import {Router} from 'express';
const csv = require('csv');
import UserModel from './mongooseSchemas/monUserSchema';
const fs = require('fs');

Router.post('/csvupload:file', (req, res, next) => {
  const path = './uploads/' + req.params.file + '.csv';
  fs.exists(path, (exists) => {
    if(exists) {
      const stream = fs.createReadStream(path);
      csv.fromStream(stream, {headers: [
          "inumber",
          "last_name",
          "first_name",
          "section"
      ]})
    }
  })
});

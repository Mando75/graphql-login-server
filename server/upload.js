import express from 'express';
import {genUnitId} from "./connectors/studentConnector";

const Multer = require('multer');
import StudentModel from './mongooseSchemas/monStudentSchema';

const fs = require('fs');
const csv = require('fast-csv');
const upload = Multer({dest: './uploads/'});
const uploadRouter = express.Router();


/**
 * define csvupload endpoint.
 * This endpoint is expecting a form field named students passing through a csv
 * file which will be saved in the user collection.
 */
uploadRouter.post('/', upload.single('students'), (req, res) => {
  const file = req.file;
  console.log(file.mimetype);
  const stream = fs.createReadStream(file.path);
  let users = [];

  // parse the csv
  csv.fromStream(stream, {headers: true}).on('data', (data) => {
    // replace any end of line chars in the inumber
    data.i_number = data.i_number.replace('#', '');
    // add each object to the array
    users.push(data);
  }).on('end', async () => {
    // generate a unit_id for each user in the array
    await users.map(async (row) => {
      row.unit_id = await genUnitId();
    });
    // insert the users in the array
    UserModel.collection.insert(users, (err, docs)=> {
      if(err)
        console.log(err);
      else
        console.log('Users were added...', docs);
    });
    // respond with message and user array
    res.json({
      message: "file Received",
      users: users
    });
  });
});

uploadRouter.get('/csvupload', (req, res, next) => {
  res.json({message: "cannot get csvupload"});
});

export {uploadRouter};


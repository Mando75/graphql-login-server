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
uploadRouter.post('/', upload.single('students'), (req, res, next) => {
  if(!req.file) {
    res.status(400).json({message: "No file found. Please attach file and try again"}).end();
    return next();
  }
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
  }).on('error', ()=> {
    res.status(415).json({message: "Invalid file. Please upload a compatible csv"}).end();
    return next();
  }).on('end', async () => {
    // generate a unit_id for each user in the array
    await users.map(async (row) => {
      row.unit_id = await genUnitId();
    });
    // insert the users in the array
    StudentModel.collection.insert(users, (err, docs)=> {
      if(err)
        console.log(err);
      else
        console.log('Students were added...', docs);
    });
    // respond with message and user array
    res.json({
      message: "file Received",
      users: users
    });
  });
});

uploadRouter.get('/csvupload', (req, res, next) => {
  res.status(400).json({message: "cannot get csvupload"});
  next();
});

export {uploadRouter};


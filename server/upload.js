import express from 'express';
import {genUnitId} from "./connectors/userConnector";

const Multer = require('multer');
import UserModel from './mongooseSchemas/monUserSchema';

const fs = require('fs');
const csv = require('fast-csv');
const upload = Multer({dest: './uploads/'});
const Router = express.Router();


Router.post('/', upload.single('students'), (req, res, next) => {
  const file = req.file;
  const stream = fs.createReadStream(file.path);
  let users = [];
  csv.fromStream(stream, {headers: true}).on('data', (data) => {
    users.push(data);
    // console.log(users);
  }).on('end', async () => {
    await users.map(async (row) => {
      row.unit_id = await genUnitId();
    });
    UserModel.collection.insert(users, (err, docs)=> {
      if(err)
        console.log(err);
      else
        console.log('Users were added...', docs);
    });
    res.json({
      message: "file Received",
      users: users
    });
  });
});

Router.get('/csvupload', (req, res, next) => {
  res.json({message: "cannot get csvupload"});
});

export {Router};

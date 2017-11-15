import express from 'express';
import {genUnitId} from "./connectors/studentConnector";
import {SectionModel} from "./mongooseSchemas/monSectionSchema";

const Multer = require('multer');
import StudentModel from './mongooseSchemas/monStudentSchema';
import TeacherModel from "./mongooseSchemas/monTeacherSchema";

const fs = require('fs');
const csv = require('fast-csv');
const upload = Multer({dest: './uploads/'});
const uploadRouter = express.Router();


/**
 * define csvupload endpoint.
 * This endpoint is expecting a form field named students passing through a csv
 * file which will be saved in the user collection.
 */
uploadRouter.post('/', upload.single('student_csv'), (req, res, next) => {

  if (!req.file) {
    res.status(400).json({message: "No file found. Please attach file and try again"}).end();
    return next();
  } else if (!req.body.section_data){
    res.status(400).json({message: "Missing file data. Please check your request"});
    return next();
  }

  const file = req.file;
  const sectionData = JSON.parse(req.body.section_data);
  const stream = fs.createReadStream(file.path);
  let users = [];

  // parse the csv
  csv.fromStream(stream, {headers: true}).on('data', (data) => {
    // replace any end of line chars in the inumber
    data.org_id = data.org_id.replace('#', '');
    // add each object to the array
    users.push(data);
  }).on('error', () => {
    res.status(415).json({message: "Invalid file. Please upload a compatible csv"}).end();
    return next();
  }).on('end', async () => {
    // generate a unit_id for each user in the array
    await users.map(async (row) => {
      row.unit_id = await genUnitId();
      row.type = 'student';
      row.create_date = new Date();
    });
    // insert the users in the array
    StudentModel.collection.insert(users, (err, docs) => {
      if (err)
        console.log(err);
      else {
        console.log('inserted batch job');
      }
    });

    const userIds = users.map(user => user._id);
    /** TODO
     * WARNING: I don't know why this works. Somehow the users
     * array is being modified by the StudentModel insert above,
     * which adds a Mongodb _id field to it. If this breaks, you have
     * been warned.
     */
    const newSection = new SectionModel({
      section_number: sectionData.section_number,
      course_code: sectionData.course_code,
      instructor : req.authpayload._id,
      start_date: Date.parse(sectionData.start_date),
      end_date: Date.parse(sectionData.end_date),
      students: userIds,
      create_date: new Date()
    });

    newSection.save((err, section) => {
      if(err) { console.log(err); return err; }
      TeacherModel.update({_id: section.instructor }, {$push: {sections: section._id}}, (err, teach) => {
        if(err) {console.log('Error when updating instructor', err); return err}
        return teach;
      });
    });
    // respond with message and user array
    res.json({
      message: "file received. Users inserted",
      users: users
    });
  });
});

uploadRouter.get('/csvupload', (req, res, next) => {
  res.status(400).json({message: "cannot get csvupload"});
  next();
});

export {uploadRouter};


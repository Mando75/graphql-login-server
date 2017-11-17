import express from 'express';
import {genUnitId} from "./connectors/studentConnector";
import {SectionModel} from "./mongooseSchemas/monSectionSchema";
import StudentModel from './mongooseSchemas/monStudentSchema';
import TeacherModel from "./mongooseSchemas/monTeacherSchema";
const Multer = require('multer');
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
  // checking the proper data was provided
  if (!req.file) {
    res.status(400).json({message: "No file found. Please attach file and try again"}).end();
    return next();
  } else if (!req.body.section_data){
    res.status(400).json({message: "Missing file data. Please check your request"});
    return next();
  }

  /* attempt to parse section_data as a JSON object. This object
  *  holds all the data needed to insert the section
  */
  let sectionData;
  try {
    sectionData = JSON.parse(req.body.section_data);
    verifySectionData(sectionData);
  } catch(e) {
    res.status(400).json({message: "Error when parsing request. Section data was improperly formatted."})
    return next();
  }


  const file = req.file;
  const stream = fs.createReadStream(file.path);
  let users = [];

  // parse the csv
  csv.fromStream(stream, {headers: true}).on('data', (data) => {
    // replace any end of line chars in the inumber
    data.org_id = data.org_id.replace('#', '');
    // add each object to the array
    users.push(data);
  }).on('error', (err) => {
    console.log(err);
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
    const newSection = createSection(sectionData, req.authpayload._id, userIds);

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

/**
 * Used to verify that the proper data is being submitted. Throws an error
 * if object is invalid
 * @param data
 * @returns {boolean}
 */
function verifySectionData(data) {
  if(data.hasOwnProperty('section_number') &&
    data.hasOwnProperty('course_code') &&
    data.hasOwnProperty('start_date') &&
    data.hasOwnProperty('end_date')) {
      return true;
  } else {
    throw new Error('Invalid object');
  }
}

/**
 * Returns a new section model built with provided data
 * @param sectionData - contains elements course_code, start and end dates, and section number
 * @param teacher_id - teacher creating the section
 * @param user_ids - array of students associated with this section
 */
function createSection(sectionData, teacher_id, user_ids) {
  return new SectionModel({
    section_number: sectionData.section_number,
    course_code: sectionData.course_code,
    instructor : teacher_id,
    start_date: Date.parse(sectionData.start_date),
    end_date: Date.parse(sectionData.end_date),
    students: user_ids,
    create_date: new Date()
  });
}

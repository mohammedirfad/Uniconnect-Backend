import express from 'express';
import {
    AddStudent,
    getStudentList,
    getStudent,
    UpdateStudent,
    DelStudent
} from '../controllers/StudentController.js';

import { verifyToken } from '../middlewares/authVerify.js';
const router = express.Router();

router.get('/getStudents/',verifyToken,getStudentList)
router.get('/getStudent',verifyToken,getStudent);
router.post('/addStudent',verifyToken,AddStudent);
router.patch('/updateStudent',verifyToken,UpdateStudent);
router.delete('/DeleteStudent',verifyToken,DelStudent);







export default router;
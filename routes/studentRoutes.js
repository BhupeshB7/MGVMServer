const express = require('express');
const router = express.Router();
const { createStudent, getStudentDetails, getResult, getClasses, deleteStudentResult } = require('../controllers/studentControllers');

// POST /api/students
router.post('/create', createStudent);
router.get('/students',getStudentDetails);
router.post('/result',getResult);
router.get('/classes',getClasses);
router.delete('/delete',deleteStudentResult);


module.exports = router;

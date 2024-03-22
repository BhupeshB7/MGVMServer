const express = require('express');
const router = express.Router();
const { createStudent, getStudentDetails, getResult, getClasses } = require('../controllers/studentControllers');

// POST /api/students
router.post('/create', createStudent);
router.get('/students',getStudentDetails);
router.post('/result',getResult);
router.get('/classes',getClasses);


module.exports = router;

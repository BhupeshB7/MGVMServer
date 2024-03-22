const { default: axios } = require("axios");
const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const { name, rollNo, className, annualExam, test } = req.body;

    // Check if rollNo is unique for the class
    const existingStudent = await Student.findOne({ rollNo, className });
    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Roll number already exists for this class" });
    }

    const newStudent = new Student({
      name,
      rollNo,
      className,
      annualExam,
      test,
    });

    await newStudent.save();
    res.json({ message: "Student details saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.getStudentDetails = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const itemsPerPage = 15; 

  try {
    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / itemsPerPage);

    const skip = (page - 1) * itemsPerPage;

    const students = await Student.find().skip(skip).limit(itemsPerPage);

    res.status(200).json({
      students,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getResult = async (req, res) => {
  const { rollNo, className, captchaResponse } = req.body;
  const captchaSecretKey = "6LdxqJ0pAAAAAKXlE0jI0hAI6XmcGw52OIIktwQv"; // Replace with your actual secret key
  // const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
  const captchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${captchaResponse}`;

  try {
    const response = await axios.post(captchaVerifyUrl);
    const {success } = response.data;
    if (!success) {
      const result = await Student.findOne({ rollNo, className });
      if (result) {
        res.json({ success: true, message: "Result found", result });
      } else {
        res.status(404).json({ error: "Result not found" });
      }
    } else {
      res.status(400).json({ error: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Student.find({}).select("className");
    if (!classes || classes.length === 0) {
      return res.status(404).json({ error: "No class names found" });
    }
    return res.json({ className: classes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

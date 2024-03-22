const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true,
    },
    className: {
        type: Number,
        required: true
    },
    annualExam: {
        type: Number,
        required: true
    },
    test: {
        type: Number,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

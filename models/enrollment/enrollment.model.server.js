var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollement.schema.server');
var enrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema);


function findEnrollment(enrollemnt) {
  return enrollmentModel.find(enrollemnt);
}

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
  return enrollmentModel.find({student: studentId})
    .populate('section')
    .exec();
}

function unenrollStudentFromSection(enrollment) {
  return enrollmentModel.remove(enrollment);
}


var api = {
  enrollStudentInSection: enrollStudentInSection,
  findEnrollment: findEnrollment,
  findSectionsForStudent: findSectionsForStudent,
  unenrollStudentFromSection: unenrollStudentFromSection
};

module.exports = api;
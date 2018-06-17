var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollement.schema.server');
var enrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema);

function findEnrollment(enrollemnt) {
  return enrollmentModel.find(enrollemnt);
}

function findSectionsForStudent(studentId) {
  return enrollmentModel.find({student: studentId})
    .populate('section')
    .exec();
}

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function unenrollStudentFromSection(enrollment) {
  return enrollmentModel.remove(enrollment);
}

var api = {
  findEnrollment: findEnrollment,
  findSectionsForStudent: findSectionsForStudent,
  enrollStudentInSection: enrollStudentInSection,
  unenrollStudentFromSection: unenrollStudentFromSection
};

module.exports = api;
var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollement.schema.server');
var enrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema);

function findEnrollment(enrollemnt) {
  return enrollmentModel.find(enrollemnt);
}

function findEnrollmentsForStudent(studentId) {
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

function deleteEnrollmentBySection(section) {
  return enrollmentModel.remove({section: section});    // FIXME
}

var api = {
  findEnrollment: findEnrollment,
  findEnrollmentsForStudent: findEnrollmentsForStudent,
  enrollStudentInSection: enrollStudentInSection,
  unenrollStudentFromSection: unenrollStudentFromSection,
  deleteEnrollmentBySection: deleteEnrollmentBySection
};

module.exports = api;
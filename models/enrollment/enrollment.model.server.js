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

function deleteEnrollmentBySectionId(sectionId) {
  return enrollmentModel.remove({section: sectionId});    // FIXME
}

var api = {
  findEnrollment: findEnrollment,
  findEnrollmentsForStudent: findEnrollmentsForStudent,
  enrollStudentInSection: enrollStudentInSection,
  unenrollStudentFromSection: unenrollStudentFromSection,
  deleteEnrollmentBySectionId: deleteEnrollmentBySectionId
};

module.exports = api;
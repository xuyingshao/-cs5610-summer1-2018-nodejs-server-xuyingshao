/**
 * Student information is included in session.
 * No need to include studentId in mapping.
 */
module.exports = function (app) {
  app.post('/api/section/:sectionId/enroll', enrollStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);
  app.delete('/api/section/:sectionId/enroll', unenrollStudentFromSection);

  var enrollmentModel = require('../models/enrollment/enrollment.model.server');
  var sectionModel = require('../models/section/section.model.server');


  function enrollStudentInSection(req, res) {
    var sectionId = req.params['sectionId'];
    var currentUser = req.session['currentUser'];
    var studentId = currentUser._id;

    var enrollment = {
      student: studentId,
      section: sectionId
    };

    sectionModel.findSectionById(sectionId)
      .then(function (sections) {
        if (sections[0].seats === 0) {
          res.sendStatus(404);
        } else {
          enrollmentModel.findEnrollment(enrollment)
            .then(function (enrollments) {
              if (enrollments.length === 0) {
                sectionModel.decrementSectionSeats(sectionId)
                  .then(function () {
                    return enrollmentModel.enrollStudentInSection(enrollment);
                  })
                  .then(function (enrollment) {
                    res.json(enrollment);
                  });
              } else {
                res.sendStatus(409);
              }
            });
        }
      });
  }


  function findSectionsForStudent(req, res) {
    var currentUser = req.session['currentUser'];
    var studentId = currentUser._id;

    enrollmentModel.findSectionsForStudent(studentId)
      .then(function (enrollments) {
        res.json(enrollments);
      })
  }


  function unenrollStudentFromSection(req, res) {
    var sectionId = req.params['sectionId'];
    var currentUser = req.session['currentUser'];
    var studentId = currentUser._id;

    var enrollment = {
      student: studentId,
      section: sectionId
    };

    enrollmentModel.findEnrollment(enrollment)
      .then((enrollments) => {
        if (enrollments.length === 0) {
          res.sendStatus(404);
        } else {
          sectionModel.incrementSectionSeats(sectionId)
            .then(() => {
              return enrollmentModel.unenrollStudentFromSection(enrollment)
            })
            .then((response) => {
              res.json(response);
            });
        }
      })
  }
};
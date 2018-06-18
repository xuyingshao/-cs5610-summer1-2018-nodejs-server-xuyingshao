module.exports = function(app) {

  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.get('/api/section/:sectionId', findSectionById);
  app.put('/api/section/:sectionId', updateSection);
  app.delete('/api/section/:sectionId', deleteSection);

  var sectionModel = require('../models/section/section.model.server');


  function createSection(req, res) {
    var section = req.body;
    sectionModel.createSection(section)
      .then(function(section) {
        res.json(section);
      });
  }


  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel.findSectionsForCourse(courseId)
      .then(function(sections) {
        res.json(sections);
      });
  }


  function findSectionById(req, res) {
    var sectionId = req.params['sectionId'];
    sectionModel.findSectionById(sectionId)
      .then(function(sections) {
        res.json(sections[0]);
      })
  }


  function updateSection(req, res) {
    var sectionId = req.params['sectionId'];
    var section = req.body;

    sectionModel.updateSection(sectionId, section)
      .then(function(status) {
        res.json(status);
      })
  }

  function deleteSection(req, res) {
    var sectionId = req.params['sectionId'];

    sectionModel.deleteSection(sectionId)
      .then(function(status) {
        res.json(status);
    })
  }

};
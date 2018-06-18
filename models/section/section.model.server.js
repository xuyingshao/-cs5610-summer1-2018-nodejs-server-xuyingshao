var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function findSectionById(sectionId) {
  return sectionModel.find({_id: sectionId});
}

function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
  return sectionModel.update({_id: sectionId}, {$inc: {seats: -1}});
}

function incrementSectionSeats(sectionId) {
  return sectionModel.update({_id: sectionId}, {$inc: {seats: +1}});
}

function updateSection(sectionId, section) {
  return sectionModel.update({_id: sectionId},
    {
      $set: {
        name: section.name,
        seats: section.seats,
        courseId: section.courseId
      }
    });
}

function deleteSection(sectionId) {
  return sectionModel.remove({_id: sectionId});
}


var api = {
  createSection: createSection,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats,
  findSectionById: findSectionById,
  updateSection: updateSection,
  deleteSection: deleteSection
};

module.exports = api;
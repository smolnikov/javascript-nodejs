const mongoose = require('mongoose');
const countries = require('countries');
const CourseFeedback = require('../models/courseFeedback');
const CourseParticipant = require('../models/courseParticipant');
const CourseGroup = require('../models/courseGroup');
const User = require('users').User;
const _ = require('lodash');
const renderFeedback = require('../lib/renderFeedback');

exports.get = function*() {

  var number = +this.params.feedbackNumber;

  var courseFeedback = yield CourseFeedback.findOne({number: number}).populate('group');

  if (!courseFeedback) {
    this.throw(404);
  }

  yield CourseGroup.populate(courseFeedback.group, "course teacher");

  var authorOrAdminOrTeacher = false;
  if (this.user) {
    if (this.user.isAdmin || this.user._id.equals(courseFeedback.userCache || ~this.user.teachesCourses.indexOf(courseFeedback.group._id))) {
      authorOrAdminOrTeacher = true;
    }
  }

  if (!courseFeedback.isPublic && !authorOrAdminOrTeacher) {
    this.throw(403, "Отзыв не публичный");
  }

  var group = this.locals.group = courseFeedback.group;

  this.locals.title = "Отзыв\n" + group.title;
  this.locals.headTitle = "Отзыв на " + group.title;

  this.locals.countries = countries.all;

  var feedbackRendered = this.locals.courseFeedback = yield* renderFeedback(courseFeedback, this.user);
  feedbackRendered.shareEnabled = true;

  this.body = this.render('feedback/show');

};


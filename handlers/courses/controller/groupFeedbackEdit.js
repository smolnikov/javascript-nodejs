'use strict';

const countries = require('countries');
const ImgurImage = require('imgur').ImgurImage;
const User = require('users').User;
const CourseFeedback = require('../models/courseFeedback');
const CourseGroup = require('../models/courseGroup');
const CourseParticipant = require('../models/courseParticipant');
const _ = require('lodash');
const assert = require('assert');

exports.all = function*() {

  let group, teacher, participant, courseFeedback;

  if (!this.user) {
    this.throw(403);
  }

  if (this.groupBySlug) {
    group = this.groupBySlug;

    participant = yield CourseParticipant.findOne({
      isActive: true,
      group: group._id,
      user: this.user._id
    });

    if (!participant) {
      this.throw(403, "Оставлять отзыв могут только участники группы");
    }

    courseFeedback = yield CourseFeedback.findOne({
      participant: participant._id
    });

    if (courseFeedback) {
      // if feedback exists already, there is another page to edit it
      this.redirect('/courses/feedback/edit/' + courseFeedback.number);
      return;
    }

    teacher = yield User.findById(group.teacher);
    courseFeedback = new CourseFeedback({
      group: group._id,
      participant:  participant._id,
      recommend:    true,
      isPublic:     true,
      country:      participant.country,
      photo:        participant.photo,
      aboutLink:    participant.aboutLink,
      city:         participant.city,
      occupation:   participant.occupation,
      userCache:    this.user._id,
      teacherCache: teacher.id
    });


  } else if (this.params.feedbackNumber) {

    courseFeedback = yield CourseFeedback.findOne({
      number: this.params.feedbackNumber
    });

    if (!courseFeedback) {
      this.throw(404);
    }

    participant = yield CourseParticipant.findById(courseFeedback.participant);

    group = yield CourseGroup.findById(courseFeedback.group);
    teacher = yield User.findById(group.teacher);

    if (!this.user._id.equals(participant._id) &&
      !this.user._id.equals(teacher._id) &&
      !this.isAdmin
    ) {
      this.throw(403, 'Не хватает прав');
    }


  }

  this.locals.title = "Отзыв\n" + group.title;

  assert(participant);
  assert(teacher);
  assert(courseFeedback);
  assert(group);

  this.locals.participant = participant;
  this.locals.group = group;
  this.locals.teacher = teacher;
  this.locals.courseFeedback = courseFeedback;
  this.locals.countries = countries.all;

  if (this.method == 'POST') {
    let feedbackData = _.pick(this.request.body,
      'stars content country city isPublic recommend aboutLink occupation'.split(' ')
    );

    feedbackData.recommend = Boolean(+feedbackData.recommend);
    feedbackData.isPublic = Boolean(+feedbackData.isPublic);

    //console.log(this.request.body.photoId, feedbackData.photo, '!!!');

    _.assign(courseFeedback, feedbackData);

    if (this.request.body.photoId) {
      var photo = yield ImgurImage.findOne({imgurId: this.request.body.photoId}).exec();
      if (photo) {
        courseFeedback.photo = photo.link;
      }
    }

    try {
      yield courseFeedback.persist();
    } catch (e) {
      var errors = {};
      for (var key in e.errors) {
        errors[key] = e.errors[key].message;
      }

      this.body = this.render('feedback/edit', {
        errors: errors,
        courseFeedback:   courseFeedback
      });

      return;
    }

    // make the new picture user avatar
    if (courseFeedback.photo && !this.user.photo) {
      yield this.user.persist({
        photo: courseFeedback.photo
      });
    }

    if (courseFeedback.isPublic) {
      this.addFlashMessage("success", "Ваш отзыв успешно сохранен. При желании, вы можете поделиться им в соц сетях.");
    } else {
      this.addFlashMessage("success", "Ваш отзыв успешно сохранен. Он будет виден только нам.");
    }

    this.redirect(`/courses/feedback/${courseFeedback.number}`);
    return;


  } else if (this.method == 'GET') {

    this.body = this.render('feedback/edit');
  }

};

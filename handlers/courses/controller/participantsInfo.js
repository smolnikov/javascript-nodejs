'use strict';

var bytes = require('bytes');
var Course = require('../models/course');
var sendMail = require('mailer').send;
var path = require('path');
var CourseGroup = require('../models/courseGroup');
var CourseParticipant = require('../models/courseParticipant');
var _ = require('lodash');
const countries = require('countries');

// Group info for a participant, with user instructions on how to login
exports.get = function*() {

  var group = this.locals.group = this.groupBySlug;

  this.locals.title = "Анкеты участников\n" + group.title;

  this.locals.countries = countries.all;

  var participants = yield CourseParticipant.find({group: group.id, isActive: true}).populate('user').sort({created: 1});

  this.locals.participants = participants;

  this.body = this.render('participantsInfo');
};

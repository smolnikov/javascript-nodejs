var angular = require('angular');
var profile = angular.module('profile');

var renderParagraphsAndLinks = require('renderParagraphsAndLinks');
var FeedbackLoader = require('courses/client/lib/feedbackLoader');

profile.controller('ProfileAboutMeCtrl', ($scope, me) => {

  $scope.me = me;

  $scope.renderParagraphsAndLinks = require('renderParagraphsAndLinks');

  setTimeout(function() {
   if (me.teachesCourses && me.teachesCourses.length) {
     new FeedbackLoader({
       elem:   document.querySelector('.course-feedbacks'),
       filter: {teacherId: me.id}
     });
   }
  }, 2000);

});

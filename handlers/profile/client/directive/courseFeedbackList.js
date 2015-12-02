var notification = require('client/notification');
var angular = require('angular');
var FeedbackLoader = require('courses/client/lib/feedbackLoader');

angular.module('profile')
  .directive('courseFeedbackList', function() {
    return {
      templateUrl: "/profile/templates/partials/courseFeedbackList",
      replace: true,

      link: function(scope, elem) {
        let me = scope.me;
        if (me.teachesCourses && me.teachesCourses.length) {
          new FeedbackLoader({
            elem:   elem[0],
            filter: {teacherId: me.id}
          });
        }
      }

    };

  });

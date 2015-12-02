var FeedbackLoader = require('courses/client/lib/feedbackLoader');

function init() {

  if (window.FEEDBACK_LIST_INIT) {
    new FeedbackLoader(window.FEEDBACK_LIST_INIT);
  }

}


init();

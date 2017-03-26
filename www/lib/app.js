angular.module('Application', ['onsen', 'firebase'])
  .controller('AppController',['$scope', '$firebaseArray' ,function( $scope, $firebaseArray) {
    $scope.load = function(page) {
      $scope.splitter.content.load(page);
      $scope.splitter.left.close();
    };

    $scope.toggle = function() {
      $scope.splitter.left.toggle();
    };
    //Show loader
    $scope.showLoader = true;
    //firebase config
    var config = {
      apiKey: 'AIzaSyBwwbhG-DgPsbSB2V9pgbzXFuoBagmXVGY',
      databaseURL: 'https://sizzling-heat-3117.firebaseio.com/',
    };

    firebase.initializeApp(config);
    //getting data from fire base
    var ref = firebase.database().ref().child('HTML/');
    $scope.questionList = $firebaseArray(ref);
    $scope.questionList.$watch(function(event) {
      if ($scope.questionList.length > 1){
        $scope.showLoader = false;
      }
    });

    $scope.getQuestion = function(question){
      $scope.load('question.html');
      $scope.questionObj = question;
      $scope.questionObj.showAns = false;
      window.history.pushState({}, "");
    }
    $scope.next = function(quesNumber){
      var question = $scope.questionList.filter(function(question){
        return question.questionNumber == quesNumber;
      })
      $scope.questionObj =  question[0];
      $scope.questionObj.showAns = false;
    }
    $scope.prev = function(quesNumber){
      var question = $scope.questionList.filter(function(question){
        return question.questionNumber == quesNumber;
      })
      $scope.questionObj =  question[0];
      $scope.questionObj.showAns = false;
    }
  }]);

ons.ready(function() {
    console.log("Onsen UI is ready!");
});

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
    $scope.$watch('questionList', function(newValue){
      if(newValue.length > 0 ){
        $scope.showLoader =  false;
      }
    })
  }]);

ons.ready(function() {
    console.log("Onsen UI is ready!");
});

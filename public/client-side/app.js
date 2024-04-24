// app.js

// Define your AngularJS module
var app = angular.module('myApp', []);

// Define a controller for your AngularJS application
app.controller('MainController', function($scope, $http) {
  // Define a function to fetch data from the server
  $scope.fetchData = function() {
    $http.get('/').then(function(response) {
      // If the request is successful, assign the response data to a scope variable
      console.log("hello i'm here!")
      $scope.serverMessage = response.data;
    }, function(error) {
      // If there's an error, log it to the console
      console.log("hello i'm here! too")
      console.error('Error fetching data:', error);
    });
  };

  // Call the fetchData function when the controller is initialized
  $scope.fetchData();
});

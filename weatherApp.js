
var myApp = angular.module('weatherModule', []);

var weatherController = function($scope, $http){
  $scope.kaupunki="";
  $scope.vastaus="";


  $scope.haeSaa = function(kaupunki) {
    if(!kaupunki){
      $scope.vastaus = "Anna kaupungin nimi!";
      return;
    } else {
      $scope.vastaus = "";
    }

    $http({
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather?q='+kaupunki+'&APPID=e0f9af4d0f443f44778fb3d4a8a75b52'
      })
      .then(function(response) {
        if(response.status === 200){
          $scope.saa = {
            "Lämpötila (C)": Math.round(response.data.main.temp-273.15),
            "Kosteus %": response.data.main.humidity,
            "Ilmanpaine (Pa)":Math.round(response.data.main.pressure)
          }
        } else {
          $scope.vastaus = "Säätä ei nyt vaan saada";
          $scope.saa = "";
          return;
        }
      }, function(response) {
        if(response.statusText==="Not Found"){
          $scope.vastaus = "Kaupunkia ei löydy!";
        } else {
          $scope.vastaus = "Tuntematon virhe";
        }
        $scope.saa = "";
        console.log("NOK", response);
      });
  }
};

myApp.controller('weatherController', weatherController);

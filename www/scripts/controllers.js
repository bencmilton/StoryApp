angular.module('starter.controllers', [])

    .controller('CreateCtrl', function ($scope, Stories, Camera) {

      $scope.storyIsActive = false;

      $scope.startSlots = {epochTime: 12600, format: 12, step: 15};
      $scope.endSlots = {epochTime: 12600, format: 12, step: 15};

      $scope.toggleScheduler = function(){
        $scope.showScheduleOptions = !($scope.showScheduleOptions);
      };

      var schedule = function (start, end, interval) {

        if (!start) {
          start = new Date().getTime();
        }

        if (!interval) {
          interval = 1200000;
        } else {
          interval = interval * 60000;
        }

        var nudge = new Date(start + interval);
        console.log('duh');

        cordova.plugins.notification.local.schedule({
          at: nudge,
          badge: 1,
          text: 'Picture Time!'
        });

        console.log('scheduled!')

      };

      $scope.startStory = function (start, end, interval) {

        $scope.storyIsActive = true;

        schedule(start, end, interval);


        Stories.startStory(start, end).then(function (data) {
          console.log('Story has started.');
          console.log('data', data);
        });
      };

      $scope.endStory = function () {
        Stories.endStory().then(function (data) {
          console.log('Story has ended.');
          console.log('data', data);
          $scope.storyIsActive = false;
        });
      };

      $scope.takePhoto = function () {
        Camera.getPicture({
          quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          destinationType: 0,
          sourceType: 1,
          allowEdit: true,
          encodingType: 0,
          saveToPhotoAlbum: false
        }).then(function (base64Image) {
            var fb = new Firebase('https://storyapp.firebaseio.com/');
            fb.set({base64Image);
        }, function (err) {
          console.err(err);
        });
      };

    })

    .controller('StoriesCtrl', function ($scope, Chats) {
      $scope.chats = Chats.all();
      $scope.remove = function (chat) {
        Chats.remove(chat);
      };
    })

//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})

    .controller('AccountCtrl', function ($scope) {
      $scope.settings = {
        enableFriends: true
      };
    });

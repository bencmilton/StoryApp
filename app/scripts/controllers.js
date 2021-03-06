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
          //destinationType: Camera.DestinationType.DATA_URL,
          //sourceType: Camera.PictureSourceType.CAMERA,
          //allowEdit: true,
          //encodingType: Camera.EncodingType.JPEG,
          saveToPhotoAlbum: false
        }).then(function (imageURI) {
          console.log(imageURI);
          $scope.lastPic = imageURI;
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

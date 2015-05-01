angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-timepicker'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

        // setup an abstract state for the tabs directive
          .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
          })

        // Each tab has its own nav history stack:

          .state('tab.create', {
            url: '/create',
            views: {
              'tab-create': {
                templateUrl: 'templates/tab-create.html',
                controller: 'CreateCtrl'
              }
            }
          })

          .state('tab.stories', {
            url: '/stories',
            views: {
              'tab-chats': {
                templateUrl: 'templates/tab-stories.html',
                controller: 'StoriesCtrl'
              }
            }
          })
        //.state('tab.chat-detail', {
        //  url: '/chats/:chatId',
        //  views: {
        //    'tab-chats': {
        //      templateUrl: 'templates/chat-detail.html',
        //      controller: 'ChatDetailCtrl'
        //    }
        //  }
        //})

          .state('tab.account', {
            url: '/account',
            views: {
              'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
              }
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/create');

    })

    .directive('standardTimeMeridian', function() {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          etime: '=etime'
        },
        template: "<strong>{{stime}}</strong>",
        link: function(scope, elem, attrs) {

          scope.stime = epochParser(scope.etime, 'time');

          function prependZero(param) {
            if (String(param).length < 2) {
              return "0" + String(param);
            }
            return param;
          }

          function epochParser(val, opType) {
            if (val === null) {
              return "00:00";
            } else {
              var meridian = ['AM', 'PM'];

              if (opType === 'time') {
                var hours = parseInt(val / 3600);
                var minutes = (val / 60) % 60;
                var hoursRes = hours > 12 ? (hours - 12) : hours;

                var currentMeridian = meridian[parseInt(hours / 12)];

                return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
              }
            }
          }

          scope.$watch('etime', function(newValue, oldValue) {
            scope.stime = epochParser(scope.etime, 'time');
          });

        }
      };
    });

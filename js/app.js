var app = angular.module( "Modal", [ "ngAnimate" ] );
  app.controller(
            "AppController",["$scope","modals",function( $scope, modals ) {
             // I open a  modal.
                var data= {};
                $scope.openModal = function() {
                    // The .open() method returns a promise that will be either
                    // resolved or rejected when the modal window is closed.
                    var promise = modals.open(
                        "modal", data
                    );
                    promise.then(
                        function handleResolve( response ) {
                            console.log( "Prompt resolved with [ %s ].", response );
                        },
                        function handleReject( error ) {
                            console.warn( "Prompt rejected!" );
                        }
                    );
                };
            }]
      );
     

      

      
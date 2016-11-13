
   // Control for modal window.
   // --
   // NOTE: This controller gets "modals" injected; but, it is in no way
   // different than any other Controller in your entire AngularJS application.
   // It takes services, manages the view-model, and knows NOTHING about the DOM.
    app.controller("ModalController",["JsonService","modals","$scope",function(JsonService, modals, $scope ) {
            // Setup defaults using the modal params.
            var params = modals.params();
            var canvas = document.getElementById('signatureCanvas');
            var signaturePad = new SignaturePad(canvas);
            init = function () {
                var ctx=canvas.getContext("2d");
                ctx.beginPath(); 
                ctx.lineWidth="1";
                ctx.strokeStyle="black"; // Green path
                ctx.moveTo(40,110);
                ctx.lineTo(260,110);
                ctx.stroke(); // Draw it
            }
            JsonService.getLabelResource().success(function (labels){
                $scope.labels= labels;
            })
            JsonService.getSummary().success(function (summary) {
                $scope.summary = summary;
            });
            JsonService.getMeterials().success(function (meterials) {
                $scope.meterials = meterials.meterials;
            });
            if(!params.sign){
                params.sign ={};
            }
            $scope.sign= params.sign;
                if(params.sign && params.sign.signImage){                               signaturePad.fromDataURL(params.sign.signImage);
            }
            else{
                init();
            }
        
            // Wire the modal buttons into modal resolution actions.
            $scope.cancel = function(){
                params.sign.signImage = signaturePad.toDataURL();
                modals.reject();    
            }; 
            // I process the form submission.
            $scope.submit = function() {
                // If no input was provided, show the user an error message.
                var elem;
                if ( ! $scope.sign.contactName ) {
                    elem =angular.element( document.querySelector( '#contactName' ) );
                    elem.removeClass('noborder');
                    elem.addClass('error');
                    return false;
                }
                if(signaturePad.isEmpty()){
                    elem =angular.element( document.querySelector( '#signatureCanvas' ) );
                    elem.addClass('error');
                    return false;
                }
                var signImg = signaturePad.toDataURL().replace('data:image/png;base64,', '');
                params.sign.signImage = signaturePad.toDataURL();
                var result = {"summary": $scope.summary,
                              "meterials" : $scope.meterials,
                              "sign" : $scope.sign};
                var xml = JSON.stringify(result); 
                //code to upload the result
                //jsonService.upload(xml).success(function (response) {
                //});
                modals.resolve();
            };
            $scope.clear = function ($event) {
                signaturePad.clear();
                init();
                $scope.sign.contactName = '';
                $scope.sign.contactAvailable = false;
                return false;
            }

    }]);



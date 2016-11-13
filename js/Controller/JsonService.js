
app.factory('JsonService', ['$http', function ($http) {
    return {
        getSummary: function () {
            return $http.get('resources/summary.json');
        },
        getMeterials: function () {
             return $http.get('resources/meterial.json');
        },
        getLabelResource : function (){
            return $http.get('resources/labels.json');
        },
        upload: function (uploadData) {
            return $http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                url: 'http://exampledomainsvc.com/UpoladSignature',
                data: { data:uploadData  }
            });
        },

    };
}]);


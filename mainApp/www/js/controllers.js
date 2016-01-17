angular.module('starter.controllers', [])

.controller('settingsController', function($scope, $cordovaBluetoothLE) {
  console.log('settingsController');
  $scope.debug = "this is debug text";
  var params = {
    request: true,
    statusReceiver: false
  };

  $scope.initialize = function() {
    var params = {request:true};

    console.log("Initialize : " + JSON.stringify(params));

    $cordovaBluetoothLE.initialize(params).then(null, initializeError, initializeSuccess);
  };

  function initializeSuccess(obj) {
    $scope.debug = "Initialize Success : " + JSON.stringify(obj);

    if (obj.status == "enabled")
    {
      $scope.debug = "enabled";
    }
    else
    {
      $scope.debug = "Unexpected Initialize Status";
    }
  }

  function initializeError(obj) {
    $scope.debug = "Initialize Error : " + JSON.stringify(obj);
  }

  $scope.startScan = function() {
    var params = {serviceUuids:[], allowDuplicates: false};

    $scope.debug = "Start Scan : " + JSON.stringify(params);

    $cordovaBluetoothLE.startScan(params).then(null, startScanError, startScanSuccess);
  };

  function startScanSuccess(obj) {
    $scope.debug = "Start Scan Success : " + JSON.stringify(obj);

    if (obj.status == "scanResult")
    {
      $scope.debug = 'Scan Result:' + JSON.stringify(obj)
    }
    else if (obj.status == "scanStarted")
    {
      $scope.debug = "Scan Started";
    }
    else
    {
      $scope.debug = "Unexpected Start Scan Status";
    }
  }

  function startScanError(obj) {
    console.log("Start Scan Error : " + JSON.stringify(obj));
  }
})


.controller('stinkController', function($scope) {
  console.log('stinkController');
});

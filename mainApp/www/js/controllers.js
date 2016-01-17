angular.module('starter.controllers', [])

.controller('settingsController', function($scope, $cordovaBluetoothLE, $rootScope) {
  $rootScope.bluetoothAddress;
  $rootScope.connected = true;
  $scope.debug = "No Connected";
  $scope.debug2 = "this is debug text2";
  $scope.devices = {
    device1: {
      name: 'name',
      address: 'address'
    },
    device2: {
      name: 'name',
      address: 'address'
    },
    device3: {
      name: 'name',
      address: 'address'
    },
    device4: {
      name: 'name',
      address: 'address'
    }
  };

  var params = {request:true};
  console.log("Initialize : " + JSON.stringify(params));
  $cordovaBluetoothLE.initialize(params).then(null, initializeError, initializeSuccess);

  function initializeSuccess(obj) {
    $scope.debug = "Initialize Success : " + JSON.stringify(obj);
    if (obj.status == "enabled") {
      $scope.debug = "enabled";
    }
    else {
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

    if (obj.status == "scanResult"){
      addDevice(obj);
      $scope.debug = 'Scan Result:' + JSON.stringify(obj)
    } else if (obj.status == "scanStarted") {
      $scope.debug = "Scan Started";
    } else {
      $scope.debug = "Unexpected Start Scan Status";
    }
  }

  function startScanError(obj) {
    console.log("Start Scan Error : " + JSON.stringify(obj));
    addDevice(obj);
  }

  $scope.stopScan = function() {
    $scope.debug = "Stop Scan";
    $cordovaBluetoothLE.stopScan().then(stopScanSuccess, stopScanError);
  };

  function stopScanSuccess(obj) {
    $scope.debug = "Stop Scan Success : " + JSON.stringify(obj);

    if (obj.status == "scanStopped") {
        $scope.debug = "Scan Stopped";
    } else {
        $scope.debug = "Unexpected Stop Scan Status";
    }
  }

  function stopScanError(obj) {
      $scope.debug =  "Stop Scan Error : " + JSON.stringify(obj);
  }

  $scope.connect = function(obj) {
    $scope.debug2 = JSON.stringify(obj.address);
    var params = {address:obj.address};
    $scope.debug = "Connecting to : " + JSON.stringify(params);
    $cordovaBluetoothLE.connect(params).then(null, connectError, connectSuccess);
  }

  function connectSuccess(obj) {
    $scope.debug = "Connect Success : " + JSON.stringify(obj);

    if (obj.status == "connected") {
      $scope.debug = "Connected";
      $rootScope.bluetoothAddress = obj.address;
      $rootScope.connected = true;
    }
    else if (obj.status == "connecting") {
      $scope.debug = "Connecting";
    }
    else {
      $scope.debug = "Unexpected Connect Status";
    }
  }

  function connectError(obj) {
    $rootScope.connected = false;
    console.log("Connect Error : " + JSON.stringify(obj));
  }

  function addDevice(obj) {
    if ($scope.devices[obj.address] !== undefined) {
      return;
    }
    obj.services = {};
    if(obj.name = null){
      obj.name = "No name";
    }
    $scope.devices[obj.address] = obj;
  }

  $scope.debugFunction = function(value){
  }
})


.controller('stinkController', function($scope, $cordovaBluetoothLE, $rootScope) {
  $scope.debug = "Status";

  $scope.stink = function(address, serviceUuid, characteristicUuid, value) {
    var params = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, value:value};
    $scope.debug = "Write : " + JSON.stringify(params);
    $cordovaBluetoothLE.write(params).then(writeSuccess, writeError);
  }

  function writeSuccess(obj) {
    $scope.debug = "Write Success : " + JSON.stringify(obj);
    if (obj.status == "written") {
      $scope.debug = "Written";
    } else {
      $scope.debug = "Unexpected Write Status";
    }
  }

  function writeError(obj) {
    $scope.debug = "Write Error : " + JSON.stringify(obj);
  }

});

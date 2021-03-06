app.service('Auth', ['$http','$q','CONSTANT',function($http,$q,CONSTANT){
  this.join = function(name,email,password) {
    var deferred = $q.defer();
    $http.post(
      CONSTANT.url+'/user/join',
      {"name":name,"email":email,"password":password}
      ).success(function(data){
        if(data.affectedRows === 1){
          deferred.resolve({resultMsg:"success"});
        }
      })
    return deferred.promise;
  }

  this.login = function(email,password){
    var deferred = $q.defer();
    $http.post(
      CONSTANT.url+'/user/login',
      {"email":email,"password":password}
    ).success(function(data){
        deferred.resolve(data);
    })
    return deferred.promise;
  }
}])

app.service('REPLY', ['$http','$q','CONSTANT',function($http,$q,CONSTANT){
  this.write = function(boardNo,content){
    var deferred = $q.defer();
    $http.post(
      CONSTANT.url+'/reply/write',
      {"boardNo":boardNo,"content":content}
    ).success(function(data){
      if(data.affectedRows === 1){
        deferred.resolve({resultMsg:"success"});
      }
    })
    return deferred.promise;
  }

  this.read = function(boardNo){
    var deferred = $q.defer();
    $http.post(
      CONSTANT.url+'/reply/read',
      {'boardNo':boardNo}
    ).success(function(data){
      deferred.resolve(data);
    })
    return deferred.promise;
  }
}])

app.service('Board', ['$http','$q','CONSTANT',function($http,$q,CONSTANT){
  this.write = function(title,content,location){
    var deferred = $q.defer();
    $http.post(
      CONSTANT.url+'/board/write',
      {"title":title,"content":content,"location":location}
    ).success(function(data){
      if(data.affectedRows === 1){
        deferred.resolve({resultMsg:"success"});
      }
    }).error(function(err){
      deferred.reject(err);
    })
      return deferred.promise;
  }

  this.read = function(){
    var deferred = $q.defer();
    $http.post(
      CONSTANT.url+'/board/read',
      {}
    ).success(function(data){
        deferred.resolve(data);
    })
    return deferred.promise;
  }
}])

app.service('Device', ['$q','$cordovaGeolocation',function($q,$cordovaGeolocation){
  this.getLocation = function(){
    var deferred = $q.defer();
    var geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    $cordovaGeolocation.getCurrentPosition(geoOptions).then(function (position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      deferred.resolve(latitude+','+longitude);
    }, function(err) {
      deferred.reject(err);
    });
    return deferred.promise;
  }
}])

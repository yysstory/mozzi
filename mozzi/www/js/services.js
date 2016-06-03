app.service('Auth', ['$http','$q',function($http,$q){
  this.join = function(name,email,password) {
    var deferred = $q.defer();
    $http.post(
      '/ajax/user/join',
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
      '/ajax/user/login',
      {"email":email,"password":password}
    ).success(function(data){
        deferred.resolve(data);
    })
    return deferred.promise;
  }
}])

app.service('REPLY', ['$http','$q',function($http,$q){
  this.write = function(boardNo,content){
    var deferred = $q.defer();
    $http.post(
      '/ajax/reply/write',
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
      '/ajax/reply/read',
      {'boardNo':boardNo}
    ).success(function(data){
      deferred.resolve(data);
    })
    return deferred.promise;
  }
}])

app.service('Board', ['$http','$q',function($http,$q){
  this.write = function(title,content){
    var deferred = $q.defer();
    $http.post(
      '/ajax/board/write',
      {"title":title,"content":content}
    ).success(function(data){
      if(data.affectedRows === 1){
        deferred.resolve({resultMsg:"success"});
      }
    }).error(function(msg){
      deferred.reject(msg);
    })
      return deferred.promise;
  }

  this.read = function(){
    var deferred = $q.defer();
    $http.post(
      '/ajax/board/read',
      {}
    ).success(function(data){
        deferred.resolve(data);
    })
    return deferred.promise;
  }
}])

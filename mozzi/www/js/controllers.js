  app.controller('AppCtrl', function($scope) {
  });

  app.controller('loginCtrl', function($scope,Auth,$ionicPopup,$state,$ionicHistory,$rootScope,$window) {
    $scope.loginInfo = {};
    $rootScope.userInfo= {};
    $scope.doLogin = function(){
      var email = $scope.loginInfo.email;
      var password = $scope.loginInfo.password;
      Auth.login(email,password).then(function(data) {
        if(data.userInfo.email){
          $window.localStorage.savedUserInfo=JSON.stringify($scope.loginInfo);
          $rootScope.userInfo=data.userInfo;
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.board');
        }
        if(!data.userInfo.email){
          $ionicPopup.alert({
            title: '로그인 실패',
            template: '아이디와 비밀번호를 다시 확인해 주세요.',
            buttons:[{text: '확인'}]
          });
          $scope.loginInfo.password='';
        }
      })
    }
   if($window.localStorage.savedUserInfo){
      var savedUserInfo =  JSON.parse($window.localStorage.savedUserInfo);
      $rootScope.userInfo.email = savedUserInfo.email;
      $rootScope.userInfo.password = savedUserInfo.password;
      $scope.loginInfo.email = savedUserInfo.email;
      $scope.loginInfo.password = savedUserInfo.password;
      $scope.doLogin();
    }
  });

  app.controller('joinCtrl', function($scope,Auth,$ionicPopup,$state) {
    $scope.joinInfo = {};
    $scope.doJoin = function(){
      var name = $scope.joinInfo.name;
      var email = $scope.joinInfo.email;
      var password = $scope.joinInfo.password;
      Auth.join(name,email,password).then(function (data) {
        if(data.resultMsg==='success'){
          var alertPopup = $ionicPopup.alert({
            title: '회원가입',
            template: '로그인하여 바로 이용가능합니다.',
            buttons:[{text: '확인'}]
          });
          alertPopup.then(function() {
            $state.go('app.login');
          });
        }
      });
    }
  });

  app.controller('boardCtrl', function($scope,$ionicModal,Board,Device) {
    $scope.boardInfo = {
      locationSharingAgree:true
    };
    $ionicModal.fromTemplateUrl('templates/boardWriteModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
      Device.getLocation().then(function(data){
        deviceLocation=data;
        console.log(data);
      }).then(function(err){
        console.log(err);
      })
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    var deviceLocation;


    $scope.doBoardWrite = function(){
      var title = $scope.boardInfo.title;
      var content = $scope.boardInfo.content;
      var location = '';
      console.log($scope.boardInfo.locationSharingAgree);
      if($scope.boardInfo.locationSharingAgree){
        location = deviceLocation;
      }
      Board.write(title,content,location).then(function(data){
        if(data.resultMsg === 'success'){
          $scope.closeModal();
          roadBoardList();
          $scope.boardInfo.title='';
          $scope.boardInfo.content='';
        }
      }).then(function(msg){
        console.log(msg);
      })
    }
    roadBoardList();
    function roadBoardList(){
      Board.read().then(function(data){
        $scope.boardList = data;
      }).then(function(err){
        console.log(err);
      })
    }
  });

  app.controller('replyCtrl', function($scope,$ionicModal,$stateParams,REPLY) {
    $scope.replyInfo = {};
    var boardNo = $stateParams.boardNo;
    $scope.doReplyWrite = function(){
      var content = $scope.replyInfo.content;
      REPLY.write(boardNo,content).then(function(data){
        if(data.resultMsg === 'success'){
          $scope.closeModal();
          roadReplyList();
          $scope.replyInfo.content='';
        }
      })
    }
    roadReplyList();
    function roadReplyList(){
      REPLY.read(boardNo).then(function(data){
        $scope.replyList = data;
      })
    }
    $ionicModal.fromTemplateUrl('templates/replyWriteModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
  });

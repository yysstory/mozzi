  app.controller('AppCtrl', function($scope) {
    $scope.joinInfo = {};
    $scope.loginInfo = {email:'yysstory@gmail.com',password:'111111'};
    $scope.userInfo = {};
    $scope.boardInfo = {};
    $scope.replyInfo = {};
  });

  app.controller('loginCtrl', function($scope,Auth,$ionicPopup,$state,$ionicHistory) {
    $scope.doLogin = function(){
      var email = $scope.loginInfo.email;
      var password = $scope.loginInfo.password;
      Auth.login(email,password).then(function(data) {
        console.log(data);
        if(data.userInfo.email){
          $scope.userInfo=data.userInfo;
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
  });

  app.controller('joinCtrl', function($scope,Auth,$ionicPopup,$state) {
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

  app.controller('boardCtrl', function($scope,$ionicModal,Board,$ionicHistory,$state) {
    $ionicModal.fromTemplateUrl('/templates/boardWriteModal.html', {
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
    $scope.doBoardWrite = function(){
      var title = $scope.boardInfo.title;
      var content = $scope.boardInfo.content;
      Board.write(title,content).then(function(data){
        if(data.resultMsg === 'success'){
          $scope.closeModal();
          roadBoardList();
          $scope.boardInfo.title='';
          $scope.boardInfo.content='';
        }
      }).then(function(msg){
        $scope.errMsg = msg;
      })
    }
    roadBoardList();
    function roadBoardList(){
      Board.read().then(function(data){
        $scope.boardList = data;
      })
    }
  });

  app.controller('replyCtrl', function($scope,$ionicModal,$stateParams,REPLY) {
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
    $ionicModal.fromTemplateUrl('/templates/replyWriteModal.html', {
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

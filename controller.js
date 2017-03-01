module.exports = ($scope,$rootScope,Restangular,$localStorage,$location)=>{
  $scope.authenticated = false;
  $scope.error = null;
  $scope.message = null;

  $scope.checkAuth = ()=>{
    $scope.authenticated = false;
    if($localStorage.token && $localStorage.token.length > 3)
      $scope.authenticated = true;
  }

  $rootScope.$on("authEvt",()=>{
    $scope.checkAuth();
  });

  $scope.signup = ()=>{
    $scope.error = null;
    $scope.message = null;
    Restangular
      .all("users")
      .post($scope.form)
      .then((resp)=>{
        $scope.message = "New user created";
      })
      .catch((err)=>{
        $scope.error = "Unable to create user";
      });
  }

  $scope.login = ()=>{
    var next = $location.$$search['next'];
    if(next== undefined)
      next = "/";
    console.log(next);
    $scope.error = null;
    $scope.message = null;
    Restangular
      .all("users/token")
      .post($scope.form)
      .then((resp)=>{
        $localStorage.token = resp.data.key;
        $localStorage.role  = resp.data.role;
        $rootScope.$broadcast("authEvt");
        $location.url(next);
      })
      .catch((err)=>{
        $scope.error = "Invalid email or password";
      });
  }

  $scope.logout = ()=>{
    $localStorage.token = null;
    $localStorage.role  = null;
    $rootScope.$broadcast("authEvt");
    $location.url("/");
  }

  $scope.checkAuth();
};

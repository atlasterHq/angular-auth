module.exports = ($localStorage,$location)=>{
  var helper = {};

  helper.isAuthenticated = ()=>{
    if($localStorage.token && $localStorage.token.length > 3)
      return true;
    return false;
  }

  helper.authRequired = ()=>{
    if($localStorage.token && $localStorage.token.length>3)
      return
    $location.url("/login?next="+$location.$$path);
  }

  helper.getToken = ()=>{
    return $localStorage.token;
  }

  return helper;
};

function EntryFormController($document, $log, $http, $window) {
  const ctrl = this;
  let usersInfo = [];
  ctrl.mistakeMsg = "";

  ctrl.validate = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3001/get3'})
      .then(response => {
        $log.log("success ", response.data);
        return response;
      }, response => {
        $log.log("failed ", response.data);
        // response3["data"] = response.statustext;
        // $scope.responses.push(response3);
        return response;
      })
      .then(previousResult => {
        // $log.log("works");
        // const username = angular.element(document).find("username").value;
        // const password = angular.element(document).find("password").value;
        usersInfo = previousResult.data.users;
        $log.log("username ", ctrl.userName);
        $log.log("password ", ctrl.userPass);
        $log.log("usersInfo ", usersInfo);
        for (let i = usersInfo.length - 1; i >= 0; i--) {
          if (ctrl.userName === usersInfo[i].name && ctrl.userPass === usersInfo[i].password) {
            $log.log("Login successfully");
            $window.location.href = '/table';
            // Redirecting to other page.
            // $window.location = "success.html";
            // return false;
          } else {
            // Decrementing by one.
            ctrl.mistakeMsg = "Wrong login or password! Try again, please";
            $log.log("wrong login or password");
            // Disabling fields after 3 attempts.
          }
        }
      });
  };
}

// The component entryForm config object.
export const entryForm = {
  template: require('./entry-form.html'),
  controller: EntryFormController,
  bindings: {}
};

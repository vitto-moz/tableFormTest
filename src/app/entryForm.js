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
        return response;
      })
      .then(previousResult => {
        usersInfo = previousResult.data.users;
        // variable for message
        let showMessage = true;
        for (let i = usersInfo.length - 1; i >= 0; i--) {
          if (ctrl.userName === usersInfo[i].name && ctrl.userPass === usersInfo[i].password) {
            $window.location.href = '/table';
            showMessage = false;
            ctrl.mistakeMsg = "";
          }
        }
        if (showMessage === true) {
          ctrl.mistakeMsg = "Wrong login or password! Try again, please!";
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

/* eslint-disable */
function EntryFormController($document, $log, $http, $state) {
  const ctrl = this;
  let usersInfo = [];
  ctrl.mistakeMsg = "";

  // method for comparing inputs with registered data from server
  ctrl.validate = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3001/getUsers'})
      .then(response => {
        return response;
      }, response => {
        $log.log("failed server connection", response.data);
        return response;
      })
      .then(previousResult => {
        usersInfo = previousResult.data.users;
        // variable for message
        let showMessage = true;
        for (let i = usersInfo.length - 1; i >= 0; i--) {
          if (ctrl.userName === usersInfo[i].name && ctrl.userPass === usersInfo[i].password) {
            $state.go('table');
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

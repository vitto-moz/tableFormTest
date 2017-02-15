import onlyUnique from '../uniqueArray';

function TableController($http, $log) {
  const ctrl = this;

  // sort method - works when table headers is clicked
  ctrl.sortTable = order => {
    $log.log("sortTable order", order);
    ctrl.order = order;
  };

  // method get table content from server
  ctrl.getTableInfo = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3001/table'})
      .then(response => {
        ctrl.employee = response.data;
        // clear variable "positions" for usage in filter
        ctrl.positions = [];
        // get filter positions + get every employee indexed
        for (let i = ctrl.employee.length - 1; i >= 0; i--) {
          ctrl.positions.push(ctrl.employee[i].position);
          ctrl.employee[i].index = i;
        }
        // get unique positiion items by means of external function
        // function is imported within current file
        ctrl.positions = (ctrl.positions).filter(onlyUnique);
        return response;
      }, response => {
        // get console message when server not works
        $log.log("failed ", response.data);
        return response;
      });
  };

  // get table content when page loading first time
  ctrl.getTableInfo();

  // method for adding employee
  ctrl.addEmployee = () => {
    $log.log("post");
    // get input values
    const employeeInfo = {
      firstName: ctrl.firstNameInput,
      secondName: ctrl.secondNameInput,
      position: ctrl.positionInput
    };
    // send post request for adding employee on backend side
    $http.post("http://localhost:3001/addEmployee", employeeInfo)
     .then(() => {
       $log.log("yes");
       // get table content with added employee
       ctrl.getTableInfo();
       // clear input after adding
       ctrl.firstNameInput = "";
       ctrl.secondNameInput = "";
       ctrl.positionInput = "";
     }, () => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
     });
    // get editing status false for hiding message under inputs
    // message is shown when editing occure
    ctrl.editing = false;
  };

  // method - clear all table content
  ctrl.clearTable = () => {
    $http.post("http://localhost:3001/clearTable")
      .then(() => {
        // get cleared content of table
        ctrl.getTableInfo();
      }, () => {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

  // method - delete checked employee
  ctrl.deleteChecked = () => {
    // send array with checked employee to server
    $http.post("http://localhost:3001/deleteChecked", ctrl.checked)
      .then(() => {
        // get content after deleting checked employees
        ctrl.getTableInfo();
        // clear array with checked employees
        ctrl.checked = [];
      }, () => {
        // called asynchronously if an error occurs
        // or server returns response with an error status
      });
  };

  // method for editing employee
  ctrl.editEmployee = employee => {
    // get input filled with editing employee info
    ctrl.firstNameInput = employee.firstName;
    ctrl.secondNameInput = employee.secondName;
    ctrl.positionInput = employee.position;
    // get true value for message show
    ctrl.editing = true;
    // get index of employee that is edited
    const edited = [employee.index];
    $http.post("http://localhost:3001/deleteChecked", edited)
      .then(() => {
        // get  table content without editing employee
        ctrl.getTableInfo();
      }, () => {
        // called asynchronously if an error occurs
        // or server returns response with an error status
      });
  };
}

// The component table config object.
export const table = {
  template: require('./table.html'),
  controller: TableController,
  bindings: {}
};

function TableController($http, $log) {
  const ctrl = this;

  // ctrl.employee = [];
  ctrl.positions = [];

  ctrl.sortTable = order => {
    $log.log("sortTable order", order);
    ctrl.order = order;
  };

  ctrl.getTableInfo = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3001/table'})
      .then(response => {
        // let requestTime = new Date().getTime() - startTime;
        $log.log("success ", response.data);
        ctrl.employee = response.data;
        ctrl.positions = [];
        for (let i = ctrl.employee.length - 1; i >= 0; i--) {
          ctrl.positions.push(ctrl.employee[i].position);
          ctrl.employee[i].index = i;
        }
        $log.log("ctrl.employee index ", ctrl.employee);
/*        for (const employee in response.data) {
          if (response.data.hasOwnProperty(o)) {
            ctrl.positions.push(employee.position);
          }
        }*/
        // response3["data"] = response.data;
        // response3["requestTime"] = requestTime;
        // $scope.responses.push(response3);
        return response;
      }, response => {
        $log.log("failed ", response.data);
        // response3["data"] = response.statustext;
        // $scope.responses.push(response3);
        return response;
      });
  };

  ctrl.getTableInfo();

  ctrl.addEmployee = () => {
    $log.log("post");
    const employeeInfo = {
      firstName: ctrl.firstNameInput,
      secondName: ctrl.secondNameInput,
      position: ctrl.positionInput
    };
    // $log.log("employeeInfo", employeeInfo);
    // ctrl.getTableInfo();

    $http.post("http://localhost:3001/addEmployee", employeeInfo)
     .then(() => {
       $log.log("yes");
       ctrl.getTableInfo();
       ctrl.firstNameInput = "";
       ctrl.secondNameInput = "";
       ctrl.positionInput = "";
       // $log.log("success ", response.data);
        // this callback will be called asynchronously
        // when the response is available
     }, () => {
       // $log.log("fail ", response.data);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
     });

  /*   .then(() => {
       $log.log("yes");
     });*/
      /* .success((data, status, headers) => {
        $log.log("Added", data, status, headers);
        ctrl.getTableInfo();
      });*/

/*      .then(() => {
        $log.log("get after post");
        ctrl.getTableInfo();
      });  */
  };

  ctrl.clearTable = () => {
    $http.post("http://localhost:3001/clearTable")
      .then(() => {
        $log.log("yes");
        ctrl.getTableInfo();
       // $log.log("success ", response.data);
        // this callback will be called asynchronously
        // when the response is available
      }, () => {
       // $log.log("fail ", response.data);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

  ctrl.deleteChecked = () => {
    $log.log("ctrl.checked ", ctrl.checked);
    $http.post("http://localhost:3001/deleteChecked", ctrl.checked)
      .then(() => {
        $log.log("yes");
        ctrl.getTableInfo();
        ctrl.checked = [];
      }, () => {
        $log.log("fail");
      });
  };

  ctrl.editEmployee = (firstName, secondName, position, index) => {
    ctrl.firstNameInput = firstName;
    ctrl.secondNameInput = secondName;
    ctrl.positionInput = position;
    const edited = [index];
    $http.post("http://localhost:3001/deleteChecked", edited)
      .then(() => {
        $log.log("yes");
        ctrl.getTableInfo();
        ctrl.checked = [];
      }, () => {
        $log.log("fail");
      });
  };
}

// The component table config object.
export const table = {
  template: require('./table.html'),
  controller: TableController,
  bindings: {}
};

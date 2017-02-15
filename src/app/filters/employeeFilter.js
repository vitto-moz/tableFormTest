/* eslint-disable */
export const employeeFilter = ($timeout) => {
  return function(arr, searchString){
    if(!searchString || searchString==""){
      return arr;   
    }

    var result = [];
    searchString = searchString.toLowerCase().trim();
    // console.log("searchString ", searchString);

    // $timeout(() => {
      angular.forEach(arr, function(item){
        var fullInfo =  item.position; 
        console.log("item.position ", item.position);
        // if(fullInfo.toLowerCase().indexOf(searchString) !== -1){
        if(fullInfo.toLowerCase() == searchString){
          result.push(item);
        }
      });
    // }, 5);
      

    return result;
  };
};


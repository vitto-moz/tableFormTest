/* eslint-disable */
function HeaderController($location, $log, $transitions) {
  const ctrl = this;
  // listen changing state of router
  $transitions.onSuccess({}, () => {
    const url = $location.url() === "/" ? ctrl.hideExit = false : ctrl.hideExit = true;
  });
}

export const header = {
  template: require('./header.html'),
  controller: HeaderController
};

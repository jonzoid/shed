var $ = rocket.extend(rocket.$, rocket);

$.ready(function() {
  new shed.view.main();
  // setTimeout(function() {new shed.view.main();}, 1000);
  // new shed.view.mod_manager();
  // new shed.view.settings();
});

var shed = {};

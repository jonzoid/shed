shed.view.settings = function() {
  shed.view.apply(this, arguments);
}
$.inherits(shed.view.settings, shed.view);

shed.view.settings.prototype.decorate_ = function(parent) {
  var header = new shed.component.header();
  header.render(parent);
};

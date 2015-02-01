shed.view.main = function() {
  shed.view.apply(this, arguments);
}
$.inherits(shed.view.main, shed.view);

shed.view.main.prototype.decorate_ = function(parent) {
  var header = new shed.component.header();
  header.render(parent);

  var manage_mods_button = $.createElement('button')
    .addClass('button_red')
    .innerHTML('Manage Mods');
  parent.appendChild(manage_mods_button);

  manage_mods_button.addEventListener('click', function() {
    new shed.view.mod_manager();
  });

  // Footer
  var table = new jex.table({'rows': 1, 'columns': 2});
  table.table().addClass('main_footer');

  var jonzoid_image = $.createElement('img')
    .setAttribute('src', 'img/jonzoid.png');
  table.td(0, 0).appendChild(jonzoid_image);

  var message = $.createElement('p')
    .innerHTML('Hi, I\'m Jonzoid! SHED is an unofficial tool pack for Stonehearth. Please let me know if you have any feedback or ideas by getting in touch with me on the Stonehearth Discourse. Thanks!');
  table.td(1, 0).appendChild(message);

  parent.appendChild(table.table());
};

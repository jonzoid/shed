shed.component.header = function() {
  shed.component.apply(this, arguments);
}
$.inherits(shed.component.header, shed.component);

shed.component.header.prototype.decorate_ = function(parent) {
  var stonehearth_logo = $.createElement('img')
    .setAttribute('src', 'img/stonehearth_logo.png')
    .style({
      'display': 'block',
      'margin': '20px auto 20px auto',
      'width': '600px'
    });

  parent.appendChild(stonehearth_logo);
};

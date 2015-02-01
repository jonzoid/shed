shed.mod = function(name) {
  this.name_ = name;
};


/**
 * The name of the mod.
 */
shed.mod.prototype.name_;


/**
 * Get the name of the mod.
 *
 * @return {string}
 */
shed.mod.prototype.get_name = function() {
  return this.name_;
};


/**
 * Zip up a mod folder. :) TODO: This is slow for large repositories and
 * adm-zip doesn't appear to have an asynchronous option. Figure this out
 *
 * @param {Function} callback
 */
shed.mod.prototype.pack = function(callback) {
  var adm_zip_ = require('adm-zip');
  var adm_zip = new adm_zip_();

  var folder_name = this.name_;
  var smod_name = this.name_ + '.smod';
  if(this.is_disabled() === true) {
    folder_name += '.disabled';
    smod_name += '.disabled';
  }

  adm_zip.addLocalFolder(localStorage.path + '\\mods\\' + folder_name, folder_name.replace('.disabled', ''));
  adm_zip.writeZip(localStorage.path + '\\mods\\' + smod_name);

  callback();
};


/**
 * Unzip a smod archive.  TODO: This is slow for large repositories and
 * adm-zip doesn't appear to have an asynchronous option. Figure this out
 *
 * @param {Function} callback
 */
shed.mod.prototype.unpack = function(callback) {
  var adm_zip_ = require('adm-zip');

  var folder_name = this.name_;
  var smod_name = this.name_ + '.smod';
  if(this.is_disabled() === true) {
    folder_name += '.disabled';
    smod_name += '.disabled';
  }

  var adm_zip = new adm_zip_(localStorage.path + '\\mods\\' + smod_name);
  adm_zip.extractAllTo(localStorage.path + '\\mods\\');

  // Rename the extracted folder. If the mod is enabled, it just renames to
  // itself. If the mod is disabled, it renames the extracted folder to be
  // disabled.
  var fs = require('fs');
  fs.renameSync(localStorage.path + '\\mods\\' + this.name_, localStorage.path + '\\mods\\' + folder_name);

  callback();
};


/**
 * Enable a mod by removing ".disabled" to the end of it's directories or smod
 * packages.
 */
shed.mod.prototype.enable = function() {
  var fs = require('fs');
  var file_entries = this.get_file_entries_();

  for(var i = 0; i < file_entries.length; i++) {
    if(file_entries[i].substr(-9) === '.disabled') {
      var old_name = localStorage.path + '\\mods\\' + file_entries[i];
      var new_name = localStorage.path + '\\mods\\' + file_entries[i].replace('.disabled', '');
      fs.renameSync(old_name, new_name);
    }
  }
};


/**
 * Disable a mod by appending ".disabled" to the end of it's directories or smod
 * packages.
 */
shed.mod.prototype.disable = function() {
  var fs = require('fs');
  var file_entries = this.get_file_entries_();

  for(var i = 0; i < file_entries.length; i++) {
    if(file_entries[i].substr(-9) !== '.disabled') {
      var old_name = localStorage.path + '\\mods\\' + file_entries[i];
      var new_name = localStorage.path + '\\mods\\' + file_entries[i] + '.disabled';
      fs.renameSync(old_name, new_name);
    }
  }
};


/**
 * Check to see whether or not this mod is disabled. This looks at both
 * directories and smods and looks for them to end with .disabled. Note that
 * if you name something "stonehearth.whatever", it won't be returned in the
 * file entries array anyways so that still counts as disabled.
 *
 * @return {Boolean}
 */
shed.mod.prototype.is_disabled = function() {
  var file_entries = this.get_file_entries_();

  for(var i = 0; i < file_entries.length; i++) {
    if(file_entries[i].substr(-9) !== '.disabled') {
      return false;
    }
  }

  return true;
};


/**
 * Check to see whether or not this mod is enabled. See shed.mod.is_disabled()
 * for more info.
 *
 * @return {Boolean} [description]
 */
shed.mod.prototype.is_enabled = function() {
  return !this.is_disabled();
}


/**
 * Determine if this mod has a directory package.
 *
 * @return {Boolean}
 */
shed.mod.prototype.has_directory = function() {
  var fs = require('fs');
  var file_entries = this.get_file_entries_();

  for(var i = 0; i < file_entries.length; i++) {
    var stat = fs.statSync(localStorage.path + '\\mods\\' + file_entries[i]);
    if(stat.isDirectory() === true) {
      return true;
    }
  }

  return false;
};


/**
 * Determine if this mod has an .smod package.
 *
 * @return {Boolean}
 */
shed.mod.prototype.has_smod = function() {
  var fs = require('fs');
  var file_entries = this.get_file_entries_();

  for(var i = 0; i < file_entries.length; i++) {
    var stat = fs.statSync(localStorage.path + '\\mods\\' + file_entries[i]);
    if(stat.isFile() === true && file_entries[i].indexOf('.smod') !== -1) {
      return true;
    }
  }

  return false;
};


/**
 * Get a list of file entries (files or folders) that seem to belong to this
 * mod object. This is allowing for the following:
 *
 * mod/
 * mod.disabled/
 * mod.smod
 * mod.smod.disabled
 *
 * @return {Array.<string>}
 */
shed.mod.prototype.get_file_entries_ = function() {
  var fs = require('fs');
  var all_file_entries = fs.readdirSync(localStorage.path + '\\mods');

  var file_entries = [];
  for(var i = 0; i < all_file_entries.length; i++) {
    if(
      all_file_entries[i] === this.name_ ||
      all_file_entries[i] === this.name_ + '.disabled' ||
      all_file_entries[i] === this.name_ + '.smod' ||
      all_file_entries[i] === this.name_ + '.smod.disabled'
    ) {
      file_entries.push(all_file_entries[i]);
    }
  }

  return file_entries;
}

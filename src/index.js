var core = require('@actions/core');
var settings = require('./settings');
var os = require('os');
var path = require('path');

function run() {
  try {
    // open default template
    var templateXml = settings.getSettingsTemplate();

    // update from action input
    settings.updateServers(templateXml);
    settings.updateMirrors(templateXml);
    settings.updateRepositories(templateXml);
    settings.updatePluginRepositories(templateXml);
    settings.updateProfiles(templateXml)

    // write template to filepath
    var settingsPath = path.join(os.homedir(), '.m2', 'settings.xml');
    settings.writeSettings(settingsPath, templateXml);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = {
  run
}
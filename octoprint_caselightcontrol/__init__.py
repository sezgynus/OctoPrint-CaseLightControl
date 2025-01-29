# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class caselightcontrolPlugin(octoprint.plugin.SettingsPlugin,
						octoprint.plugin.AssetPlugin,
						octoprint.plugin.TemplatePlugin):

	##~~ SettingsPlugin mixin

	def get_settings_defaults(self):
		return {'distance': 0.1}

	##~~ AssetPlugin mixin

	def get_assets(self):
		return {'js': ["js/caselightcontrol.js"]}

	##-- TemplatePlugin mixin

	def get_template_configs(self):
		return [{'type': "settings", 'custom_bindings': False}, {'type': "controls", 'custom_bindings': False}]

	##~~ Softwareupdate hook

	def get_update_information(self):
		return {'caselightcontrol': {'displayName': "Case Light Control", 'displayVersion': self._plugin_version,
								 'type': "github_release", 'user': "sezgynus", 'repo': "OctoPrint-CaseLightControl",
								 'current': self._plugin_version,
								 'pip': "https://github.com/sezgynus/OctoPrint-CaseLightControl/archive/{target_version}.zip"}}

__plugin_name__ = "Case Light Control"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = caselightcontrolPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}


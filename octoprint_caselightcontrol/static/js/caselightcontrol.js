/*
 * View model for OctoPrint-CaseLightControl
 *
 * Author: sezgynus
 * License: AGPLv3
 */
$(function() {
    function caselightcontrolViewModel(parameters) {
        var self = this;

		self.settingsViewModel = parameters[0];
		self.controlViewModel = parameters[1];

        self.distance = ko.observable();

        self.onBeforeBinding = function() {
            self.distance(self.settingsViewModel.settings.plugins.babystepping.distance());
        };

        self.onEventSettingsUpdated  = function() {
            self.distance(self.settingsViewModel.settings.plugins.babystepping.distance());
        };

	self.getAdditionalControls = function() {
            return [
                {
                    name: "Case Light Control", type: "section", layout: "horizontal", children: [
                        {
                            type: "javascript",
                            javascript: "OctoPrint.control.sendGcode('M355 S1'));",
                            name: "Case Light ON"
                        },
                        {
                            type: "javascript",
                            javascript: "OctoPrint.control.sendGcode('M355 S0');",
                            name: "Case Light OFF"
                        }
                    ]
                }
            ];
	};
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: caselightcontrolViewModel,
        dependencies: [ "settingsViewModel", "controlViewModel" ],
        elements: [ "settings_plugin_caselightcontrol_form" ]
    });
});

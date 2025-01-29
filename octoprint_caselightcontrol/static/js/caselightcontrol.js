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

        //self.lightState = ko.observable(false); // Açık/Kapalı durumu
        //self.brightness = ko.observable(0); // Parlaklık değeri 0-255 arası

        self.toggleLight = function() {
            var command = self.lightState() ? "M355 S1" : "M355 S0";
            OctoPrint.control.sendGcode(command);
        };

        self.updateBrightness = function() {
            var brightnessValue = self.brightness();
            OctoPrint.control.sendGcode("M355 P" + brightnessValue);
        };

        self.getAdditionalControls = function() {
            return [
                {
                    name: "Case Light Control", type: "section", layout: "horizontal", children: [
                        {
                            type: "custom_control",
                            name: "Light Switch",
                            controls: [
                                {
                                    type: "checkbox",
                                    bind: "lightState",
                                    action: "toggleLight"
                                }
                            ]
                        },
                        {
                            type: "custom_control",
                            name: "Brightness",
                            controls: [
                                {
                                    type: "slider",
                                    bind: "brightness",
                                    min: 0,
                                    max: 255,
                                    step: 1,
                                    action: "updateBrightness"
                                }
                            ]
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

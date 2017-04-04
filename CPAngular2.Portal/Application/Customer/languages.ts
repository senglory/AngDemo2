import {Component, ElementRef, OnInit} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'languages',
    templateUrl: 'application/customer/languages.html'
})

export class LanguagesSelector implements OnInit {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        var wrapper = jQuery(this.elementRef.nativeElement); //Fields wrapper
        var add_language_button = jQuery(".add_language_button");
        var language_content = jQuery(".language-content", wrapper);
        var panel_heading = jQuery(".panel-heading", wrapper);


        var langugeDict = {
            "add": "Add Language",
            "de": "German",
            "en": "English",
            "es": "Spanish",
            "zh": "Chinese",
            "pt": "Portuguese",
            "fr": "French",
            "it": "Italian",
            "ru": "Russian",
            "nl": "Dutch",
            "pl": "Polish",
            "ro": "Romanian",
            "no": "Norwegian",
            "cs": "Czech",
            "el": "Greek",
            "tr": "Turkish",
            "da": "Danish",
            "ar": "Arabic",
            "he": "Hebrew",
            "ko": "Korean",
            "sv": "Swedish",
            "fi": "Finnish",
            "hu": "Hungarian",
            "ua": "Ukrainian",
            "other": "Other"
        };

        var languageLevels = {
            "0": "-",
            "1": "Basic knowledge",
            "2": "Good knowledge",
            "3": "Fluent",
            "4": "Native speaker"
        };




        var myLangugeDict = {
            "ru": { Name: 'Russian', Progress: '100', Level: '4' },
            "ua": { Name: 'Ukrainian', Progress: '80', Level: '3' },
            "en": { Name: 'English', Progress: '50', Level: '2' },
            "de": { Name: 'German', Progress: '50', Level: '2' },
            "es": { Name: 'Spanish', Progress: '20', Level: '1' }
        };


        language_content.hover(
            function () {
                language_content.addClass("panel panel-default");
                panel_heading.html('<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"></span>Edit</button>');
            }, function () {
                language_content.removeClass("panel panel-default");
                panel_heading.html('');
            }
        );

        jQuery.each(langugeDict, function (key, value) {
            if (myLangugeDict.hasOwnProperty(key)) {
                jQuery('#language-select', wrapper).append(jQuery('<option>', {
                    value: key,
                    text: value
                }).attr('disabled', 'disabled'));
            } else {
                jQuery('#language-select', wrapper).append(jQuery('<option>', {
                    value: key,
                    text: value
                }));
            }
        });

        jQuery.each(myLangugeDict, function (key, value) {
            var contentId = "#content-" + key;
            var languageLevelSelectId = "#language-level-select-" + key;

            jQuery(".my-languages-content", wrapper).append('<div id="content-' + key + '" class="' + key + '">' +
                '<div class="progress">' +
                '<div id="progress-bar-' + key + '" class="progress-bar progress-bar-info" role="progressbar" style="width: ' + value.Progress + '%; text-align: left;" aria-valuenow="' + value.Progress + '" aria-valuemin="0" aria-valuemax="100">' +
                '<div class="language-title"><span>' + value.Name + '</span></div></div></div>' +
                '<div class="dropdown" style="float: left; margin-left: 20px;">' +
                '<select id="language-level-select-' + key + '" class="form-control" data-style="btn-primary"></select></div>');

            if (value.Level != 4) {
                jQuery(contentId, wrapper).append('<div class="remove-language-button">' +
                    '   <a href="#" class="remove_field" title="remove"><i class="fa fa-remove"></i></a>' +
                    '</div>');
            }

            jQuery(contentId, wrapper).on("click", ".remove_field", function (e) {
                removeMyLanguageFromDictionary(key);
                jQuery(contentId).remove();
            });

            jQuery.each(languageLevels, function (i, item) {
                if (i == value.Level) {
                    jQuery(languageLevelSelectId).append(jQuery('<option>', {
                        value: i,
                        text: item,
                    }).attr("selected", "selected"));
                } else {
                    jQuery(languageLevelSelectId).append(jQuery('<option>', {
                        value: i,
                        text: item,
                    }));
                }
            });

            jQuery(languageLevelSelectId, wrapper).click(function () {
                var progressBarId = "#progress-bar-" + key;

                if (jQuery(languageLevelSelectId, wrapper).val() == 0) {
                    jQuery(progressBarId, wrapper).css('width', 0 + '%').attr('aria-valuenow', 0);
                } else if (jQuery(languageLevelSelectId, wrapper).val() == 1) {
                    jQuery(progressBarId, wrapper).css('width', 20 + '%').attr('aria-valuenow', 20);
                } else if (jQuery(languageLevelSelectId, wrapper).val() == 2) {
                    jQuery(progressBarId, wrapper).css('width', 50 + '%').attr('aria-valuenow', 50);
                } else if (jQuery(languageLevelSelectId, wrapper).val() == 3) {
                    jQuery(progressBarId, wrapper).css('width', 80 + '%').attr('aria-valuenow', 80);
                } else if (jQuery(languageLevelSelectId, wrapper).val() == 4) {
                    jQuery(progressBarId, wrapper).css('width', 100 + '%').attr('aria-valuenow', 100);
                }
            });

            jQuery(".my-languages-content", wrapper).append('</div><div class="clearfix"></div>');
        });

        jQuery("#language-select", wrapper).change(function () {
            var str = "";
            var strVal = "";

            jQuery("#language-select option:selected", wrapper).each(function () {
                str += jQuery(this).text() + " ";
                strVal += jQuery(this).val();

                if (strVal != "" && strVal != "add" && strVal != "other") {
                    jQuery(this).attr('disabled', 'disabled');
                }
            });

            if (strVal != "" && strVal != "add" && strVal != "other") {
                var contentId = "#content-" + strVal;
                var languageLevelSelectId = "#language-level-select-" + strVal;

                jQuery(".my-languages-content", wrapper).append('<div id="content-' + strVal + '" class="' + strVal + '">' +
                    '<div class="progress">' +
                    '<div id="progress-bar-' + strVal + '"  class="progress-bar progress-bar-info" role="progressbar" style="width: 0%; text-align: left;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">' +
                    '<div class="language-title"><span>' + str + '</span></div></div></div>' +
                    '<div class="dropdown" style="float: left; margin-left: 20px;">' +
                    '<select id="language-level-select-' + strVal + '" class="form-control" data-style="btn-primary"></select>' +
                    '</div>' +
                    '<div class="remove-language-button">' +
                    '   <a href="#" class="remove_field" title="remove"><i class="fa fa-remove"></i></a></div>' +
                    '</div>' +
                    '<div class="clearfix"></div>');

                jQuery(contentId, wrapper).on("click", ".remove_field", function (e) {
                    removeMyLanguageFromDictionary(strVal);
                    jQuery(contentId, wrapper).remove();
                });

                //myLangugeDict = {
                //    strVal: { Name: str, Progress: '50', Level: '2' }
                //};

                jQuery.each(languageLevels, function (i, item) {
                    jQuery(languageLevelSelectId, wrapper).append(jQuery('<option>', {
                        value: i,
                        text: item,
                    }));
                });

                jQuery(languageLevelSelectId, wrapper).click(function () {
                    var progressBarId = "#progress-bar-" + strVal;

                    if (jQuery(languageLevelSelectId, wrapper).val() == 0) {
                        jQuery(progressBarId, wrapper).css('width', 0 + '%').attr('aria-valuenow', 0);
                    } else if (jQuery(languageLevelSelectId, wrapper).val() == 1) {
                        jQuery(progressBarId, wrapper).css('width', 20 + '%').attr('aria-valuenow', 20);
                    } else if (jQuery(languageLevelSelectId, wrapper).val() == 2) {
                        jQuery(progressBarId, wrapper).css('width', 50 + '%').attr('aria-valuenow', 50);
                    } else if (jQuery(languageLevelSelectId, wrapper).val() == 3) {
                        jQuery(progressBarId, wrapper).css('width', 80 + '%').attr('aria-valuenow', 80);
                    } else if (jQuery(languageLevelSelectId, wrapper).val() == 4) {
                        jQuery(progressBarId, wrapper).css('width', 100 + '%').attr('aria-valuenow', 100);
                    }
                });

            }
        }).trigger("change");

        function removeMyLanguageFromDictionary(language) {
            delete myLangugeDict[language];

            jQuery('#language-select', wrapper).html("");

            jQuery.each(langugeDict, function (key, value) {
                if (myLangugeDict.hasOwnProperty(key)) {
                    jQuery('#language-select', wrapper).append(jQuery('<option>', {
                        value: key,
                        text: value
                    }).attr('disabled', 'disabled'));
                } else {
                    jQuery('#language-select', wrapper).append(jQuery('<option>', {
                        value: key,
                        text: value
                    }));
                }
            });
        }
    }
}

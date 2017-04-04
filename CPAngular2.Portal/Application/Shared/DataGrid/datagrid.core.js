"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataGridSortInformation = (function () {
    function DataGridSortInformation() {
    }
    return DataGridSortInformation;
}());
exports.DataGridSortInformation = DataGridSortInformation;
var DataGridButton = (function () {
    function DataGridButton() {
    }
    return DataGridButton;
}());
exports.DataGridButton = DataGridButton;
var DataGridEventInformation = (function () {
    function DataGridEventInformation() {
    }
    return DataGridEventInformation;
}());
exports.DataGridEventInformation = DataGridEventInformation;
var DataGridColumn = (function () {
    function DataGridColumn(name, description, options) {
        this.buttons = [];
        this.name = name;
        this.description = description;
        this.options = JSON.parse(options);
        this.cellWidth = this.options[0].width;
        this.textAlign = this.options[0].textAlign;
        this.hyperLink = this.options[0].hyperLink;
        if (this.hyperLink != true) {
            this.hyperLink = false;
        }
        this.singleButton = this.options[0].singleButton;
        this.multiButton = this.options[0].multiButton;
        if (this.singleButton != true) {
            this.singleButton = false;
        }
        if (this.singleButton == true) {
            this.buttonText = this.options[0].buttonText;
        }
        if (this.multiButton != true) {
            this.multiButton = false;
        }
        if (this.multiButton == true) {
            this.buttonText = this.options[0].buttonText;
            var buttons = this.buttonText.split("|");
            var items = buttons.length;
            for (var i = 0; i < items; i++) {
                var button = new DataGridButton();
                button.ButtonText = buttons[i];
                this.buttons.push(button);
            }
        }
        this.disableSorting = this.options[0].disableSorting;
        if (this.disableSorting != true) {
            this.disableSorting = false;
        }
        this.formatDate = this.options[0].formatDate;
        if (this.formatDate != true) {
            this.formatDate = false;
        }
        this.formatDateTime = this.options[0].formatDateTime;
        if (this.formatDateTime != true) {
            this.formatDateTime = false;
        }
    }
    return DataGridColumn;
}());
exports.DataGridColumn = DataGridColumn;
var DataGridSorter = (function () {
    function DataGridSorter() {
        this.direction = 1;
    }
    DataGridSorter.prototype.sort = function (key, data) {
        if (this.key === key) {
            this.direction = this.direction * -1;
        }
        else {
            this.direction = 1;
        }
        this.key = key;
        var sortInformation = new DataGridSortInformation();
        sortInformation.Column = key;
        sortInformation.Direction = this.direction;
        if (this.direction == -1) {
            sortInformation.SortDirection = "DESC";
        }
        else {
            sortInformation.SortDirection = "ASC";
        }
        return sortInformation;
    };
    return DataGridSorter;
}());
exports.DataGridSorter = DataGridSorter;
//# sourceMappingURL=datagrid.core.js.map
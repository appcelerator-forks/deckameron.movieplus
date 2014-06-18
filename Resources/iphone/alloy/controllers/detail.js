function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.__alloyId1 = Ti.UI.createTableViewRow({
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createTableViewRow({
        id: "__alloyId2"
    });
    __alloyId0.push($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        id: "__alloyId3"
    });
    __alloyId0.push($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createTableViewRow({
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createTableViewRow({
        id: "__alloyId5"
    });
    __alloyId0.push($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createTableViewRow({
        id: "__alloyId6"
    });
    __alloyId0.push($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createTableViewRow({
        id: "__alloyId7"
    });
    __alloyId0.push($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createTableViewRow({
        id: "__alloyId8"
    });
    __alloyId0.push($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        id: "__alloyId9"
    });
    __alloyId0.push($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        id: "__alloyId10"
    });
    __alloyId0.push($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createTableViewRow({
        id: "__alloyId11"
    });
    __alloyId0.push($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        id: "__alloyId12"
    });
    __alloyId0.push($.__views.__alloyId12);
    $.__views.detail = Ti.UI.createTableView({
        backgroundColor: "#4A4A4A",
        separatorColor: "#979797",
        data: __alloyId0,
        id: "detail"
    });
    $.__views.detail && $.addTopLevelView($.__views.detail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
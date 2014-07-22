function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tmp/hot/castDetail/index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.castDetailWin = Ti.UI.createWindow({
        backgroundColor: "#4A4A4A",
        width: "100%",
        height: "100%",
        top: 0,
        barColor: "#4A4A4A",
        translucent: false,
        titleAttributes: {
            color: "#F5A623",
            font: {
                fontSize: 15
            }
        },
        tintColor: "#979797",
        navTintColor: "#fffffe",
        id: "castDetailWin",
        title: "cast details"
    });
    $.__views.castDetailWin && $.addTopLevelView($.__views.castDetailWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    id = args.id;
    var castDetailCollection = Alloy.Collections.instance("castDetail");
    if (!castDetailCollection.get(id)) {
        var castDetailModel = Alloy.createModel("castDetail", {
            id: id
        });
        castDetailCollection.add(castDetailModel);
        castDetailModel.getInfo(function() {}, function(err) {
            alert("get cast detail error: " + err);
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
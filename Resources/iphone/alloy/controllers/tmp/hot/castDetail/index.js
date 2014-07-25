function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createCastDetailBiographyContent(content) {
        return Ti.UI.createLabel({
            text: content,
            width: 288,
            height: "auto",
            verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
            top: 42,
            color: "#CFCFCF",
            font: {
                fontSize: 12
            }
        });
    }
    function createCastDetailBiographyContentShowMoreButton() {
        return Ti.UI.createButton({
            title: "show more",
            width: "auto",
            height: 12,
            color: "#F5A623",
            tintColor: "#CFCFCF",
            font: {
                fontSize: 12
            },
            right: 14,
            bottom: 15
        });
    }
    function expandCastDetailBiographyContent() {
        var castDetailBiographyContent = $.castDetailBiography.children[1];
        var castDetailBiographyContentShowMoreButton = $.castDetailBiography.children[2];
        var buttonHeight = parseInt(castDetailBiographyContentShowMoreButton.height);
        var height = parseInt(castDetailBiographyContent.height);
        var origHeight = castDetailBiographyContent.origHeight;
        if (origHeight && origHeight > height) {
            var diff = origHeight - height - buttonHeight;
            Fader.fadeOut(castDetailBiographyContent, 200, function() {
                castDetailBiographyContent.height = origHeight;
                $.castDetailBiography.height += diff;
                setTimeout(function() {
                    Fader.fadeIn(castDetailBiographyContent, 100);
                }, 300);
            });
            castDetailBiographyContentShowMoreButton.hide();
        }
    }
    function createCastDetailCover(image) {
        var h = parseInt(Ti.Platform.displayCaps.platformWidth) / parseInt(image.width) * parseInt(image.height);
        return Blur.createGPUGrayscaleImageView({
            image: image,
            width: Ti.Platform.displayCaps.platformWidth,
            height: h,
            grayscale: true
        });
    }
    function renderCastDetailCover(model) {
        model.getBackdrop(0, function(file) {
            RemoteImageView.load({
                filePath: file
            }, function(image) {
                var castDetailCover = createCastDetailCover(image);
                $.castDetailTable.addParallaxWithView(castDetailCover, parseInt(castDetailCover.height) - 40, true, "#4A4A4A");
            }, function() {
                alert("error get remote image");
            });
        }, function() {
            alert("error get cast detail movie backdrop!");
        });
    }
    function renderCastDetailInfo(model) {
        var croppedImage = Ti.UI.createImageView({
            image: model.getAvatar()
        }).toImage().imageAsCropped({
            width: 500,
            height: 500,
            x: 0,
            y: 0
        });
        $.castDetailAvatar.image = croppedImage;
        $.castDetailBirthday.text = model.get("birthday");
        $.castDetailPlace.text = model.get("place_of_birth");
    }
    function renderCastDetailBiography(model) {
        var castDetailBiographyContent = createCastDetailBiographyContent(model.get("biography"));
        var castDetailBiographyContentShowMoreButton = null;
        $.castDetailBiography.add(castDetailBiographyContent);
        if (castDetailBiographyContent.getText() && "" !== castDetailBiographyContent.getText()) {
            var castDetailBiographyContentExpectedHeight = 0;
            var castDetailBiographyContentHeight = 0;
            castDetailBiographyContent.origHeight = castDetailBiographyContent.toImage().height;
            if (castDetailBiographyContent.origHeight > 75) {
                castDetailBiographyContentExpectedHeight = 75;
                castDetailBiographyContentHeight = castDetailBiographyContentExpectedHeight + 77;
                castDetailBiographyContentShowMoreButton = createCastDetailBiographyContentShowMoreButton();
                $.castDetailBiography.add(castDetailBiographyContentShowMoreButton);
                castDetailBiographyContentShowMoreButton.addEventListener("click", expandCastDetailBiographyContent);
            } else {
                castDetailBiographyContentExpectedHeight = castDetailBiographyContent.origHeight;
                castDetailBiographyContentHeight = castDetailBiographyContentExpectedHeight + 60;
            }
            castDetailBiographyContent.setHeight(castDetailBiographyContentExpectedHeight);
            $.castDetailBiography.setHeight(castDetailBiographyContentHeight);
        } else {
            $.castDetailBiography.hide();
            castDetailBiographyContent = null;
        }
    }
    function renderCastDetailActings(model) {
        var items = [];
        var posters = model.getPosters();
        if (posters) {
            _.each(posters, function(poster) {
                var view = Ti.UI.createImageView({
                    width: 77,
                    height: 127,
                    image: poster
                });
                var values = {
                    image: poster
                };
                items.push({
                    view: view,
                    data: values
                });
            });
            $.fg.addGridItems(items);
        }
    }
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
        id: "castDetailWin"
    });
    $.__views.castDetailWin && $.addTopLevelView($.__views.castDetailWin);
    var __alloyId20 = [];
    $.__views.castDetailInfoRow = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "transparent",
        id: "castDetailInfoRow"
    });
    __alloyId20.push($.__views.castDetailInfoRow);
    $.__views.castDetailInfo = Ti.UI.createView({
        width: "100%",
        height: 135,
        top: -35,
        id: "castDetailInfo"
    });
    $.__views.castDetailInfoRow.add($.__views.castDetailInfo);
    $.__views.castDetailBirthdayTitle = Ti.UI.createLabel({
        color: "#F5A623",
        width: 124,
        height: "auto",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        left: 16,
        top: 0,
        id: "castDetailBirthdayTitle",
        text: "Birthday"
    });
    $.__views.castDetailInfo.add($.__views.castDetailBirthdayTitle);
    $.__views.castDetailBirthday = Ti.UI.createLabel({
        color: "white",
        width: 124,
        height: "auto",
        left: 16,
        top: 16,
        font: {
            fontSize: 12
        },
        id: "castDetailBirthday"
    });
    $.__views.castDetailInfo.add($.__views.castDetailBirthday);
    $.__views.castDetailPlaceTitle = Ti.UI.createLabel({
        color: "#F5A623",
        width: 124,
        height: "auto",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        left: 16,
        top: 45,
        id: "castDetailPlaceTitle",
        text: "Place of Birth"
    });
    $.__views.castDetailInfo.add($.__views.castDetailPlaceTitle);
    $.__views.castDetailPlace = Ti.UI.createLabel({
        color: "white",
        width: 124,
        height: "auto",
        left: 16,
        top: 60,
        font: {
            fontSize: 12
        },
        id: "castDetailPlace"
    });
    $.__views.castDetailInfo.add($.__views.castDetailPlace);
    $.__views.castDetailAvatarWrapper = Ti.UI.createView({
        width: 110,
        height: 110,
        borderRadius: 55,
        shadow: {
            shadowOpacity: .35,
            shadowRadius: 5,
            shadowOffset: {
                x: 0,
                y: 0
            }
        },
        top: 0,
        right: 20,
        id: "castDetailAvatarWrapper"
    });
    $.__views.castDetailInfo.add($.__views.castDetailAvatarWrapper);
    $.__views.castDetailAvatar = Ti.UI.createImageView({
        width: 110,
        height: 110,
        borderRadius: 55,
        id: "castDetailAvatar"
    });
    $.__views.castDetailAvatarWrapper.add($.__views.castDetailAvatar);
    $.__views.castDetailBiographyRow = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "transparent",
        id: "castDetailBiographyRow"
    });
    __alloyId20.push($.__views.castDetailBiographyRow);
    $.__views.castDetailBiography = Ti.UI.createView({
        width: 288,
        top: 0,
        id: "castDetailBiography"
    });
    $.__views.castDetailBiographyRow.add($.__views.castDetailBiography);
    $.__views.castDetailBiographyTitle = Ti.UI.createLabel({
        color: "#F5A623",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        left: 0,
        top: 22,
        id: "castDetailBiographyTitle",
        text: "Biography"
    });
    $.__views.castDetailBiography.add($.__views.castDetailBiographyTitle);
    $.__views.castDetailActingRow = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "transparent",
        id: "castDetailActingRow"
    });
    __alloyId20.push($.__views.castDetailActingRow);
    $.__views.castDetailActing = Ti.UI.createView({
        id: "castDetailActing"
    });
    $.__views.castDetailActingRow.add($.__views.castDetailActing);
    $.__views.castDetailActingTitle = Ti.UI.createLabel({
        color: "#F5A623",
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        left: 16,
        top: 22,
        id: "castDetailActingTitle",
        text: "Acting"
    });
    $.__views.castDetailActing.add($.__views.castDetailActingTitle);
    $.__views.fg = Alloy.createWidget("com.prodz.tiflexigrid", "widget", {
        id: "fg",
        __parentSymbol: $.__views.castDetailActing
    });
    $.__views.fg.setParent($.__views.castDetailActing);
    $.__views.castDetailTable = Ti.UI.createTableView({
        backgroundColor: "#4A4A4A",
        width: "100%",
        height: "100%",
        top: 0,
        separatorColor: "#979797",
        data: __alloyId20,
        id: "castDetailTable"
    });
    $.__views.castDetailWin.add($.__views.castDetailTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var Blur = require("bencoding.blur");
    var Fader = require("alloy/animation");
    var RemoteImageView = require("remoteImage");
    var castDetailCollection = Alloy.Collections.instance("castDetail");
    $.fg.init({
        columns: 3,
        space: 5,
        gridBackgroundColor: "#4A4A4A",
        itemHeightDelta: 0,
        itemBackgroundColor: "#4A4A4A",
        itemBorderColor: "transparent",
        itemBorderWidth: 0,
        itemBorderRadius: 0
    });
    Ti.App.addEventListener("cast:detail:open", function(e) {
        $.castDetailWin.title = e.name;
        if (!castDetailCollection.get(e.id)) {
            var castDetailModel = Alloy.createModel("castDetail", {
                id: e.id
            });
            castDetailCollection.add(castDetailModel);
            castDetailModel.getActings(function() {
                renderCastDetailCover(this);
                renderCastDetailActings(this);
            }, function(err) {
                alert("get cast actings error: " + err);
            });
            castDetailModel.getInfo(function() {
                renderCastDetailInfo(this);
                renderCastDetailBiography(this);
            }, function(err) {
                alert("get cast detail error: " + err);
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
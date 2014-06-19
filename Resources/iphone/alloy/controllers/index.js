function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.main = Ti.UI.createWindow({
        width: "100%",
        height: "100%",
        translucent: false,
        title: "Hello World",
        barColor: "#4a4a4a",
        backgroundColor: "#4a4a4a",
        id: "main"
    });
    $.__views.hamburger = Ti.UI.createButton({
        backgroundImage: "/hamburger.png",
        width: 16,
        height: 14,
        id: "hamburger"
    });
    $.__views.main.leftNavButton = $.__views.hamburger;
    $.__views.root = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.main,
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.sidebar = Ti.UI.createWindow({
        backgroundColor: "#2e2e2e",
        id: "sidebar"
    });
    $.__views.sidebar && $.addTopLevelView($.__views.sidebar);
    var __alloyId13 = [];
    $.__views.__alloyId14 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId14"
    });
    __alloyId13.push($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createImageView({
        left: 20,
        width: 22,
        image: "/movie.png",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "My Watchlist",
        id: "__alloyId16"
    });
    $.__views.__alloyId14.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId17"
    });
    __alloyId13.push($.__views.__alloyId17);
    $.__views.leftTableIconHot = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconHot",
        image: "/news.png"
    });
    $.__views.__alloyId17.add($.__views.leftTableIconHot);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Whats' hot",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId19"
    });
    __alloyId13.push($.__views.__alloyId19);
    $.__views.leftTableIconGenre = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconGenre",
        image: "/movie.png"
    });
    $.__views.__alloyId19.add($.__views.leftTableIconGenre);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movie Genre",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId21"
    });
    __alloyId13.push($.__views.__alloyId21);
    $.__views.leftTableIconNews = Ti.UI.createImageView({
        left: 20,
        width: 16,
        id: "leftTableIconNews",
        image: "/news.png"
    });
    $.__views.__alloyId21.add($.__views.leftTableIconNews);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movies News",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId23"
    });
    __alloyId13.push($.__views.__alloyId23);
    $.__views.leftTableIconTicket = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconTicket",
        image: "/ticket.png"
    });
    $.__views.__alloyId23.add($.__views.leftTableIconTicket);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Buy tickets",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId25"
    });
    __alloyId13.push($.__views.__alloyId25);
    $.__views.leftTableIconSetting = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconSetting",
        image: "/setting.png"
    });
    $.__views.__alloyId25.add($.__views.leftTableIconSetting);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Settings",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.leftTable = Ti.UI.createTableView({
        backgroundColor: "#2e2e2e",
        opacity: 0,
        scrollable: false,
        rowHeight: 70,
        width: 210,
        left: 5,
        top: 30,
        height: 417,
        separatorColor: "#979797",
        data: __alloyId13,
        id: "leftTable"
    });
    $.__views.sidebar.add($.__views.leftTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var NappSlideMenu = require("dk.napp.slidemenu");
    var Animator = require("com.animecyc.animator");
    var winAnimation = {
        trans3d: Ti.UI.create3DMatrix(),
        animation: Ti.UI.createAnimation()
    };
    var nowPlaying = Alloy.createController("content/nowPlaying");
    var detail = Alloy.createController("detail");
    var window = NappSlideMenu.createSlideMenuWindow({
        centerWindow: $.root,
        leftWindow: $.sidebar,
        leftLedge: 140,
        statusBarStyle: NappSlideMenu.STATUSBAR_WHITE,
        parallaxAmount: .3
    });
    var tempWin = Ti.UI.createWindow({
        backgroundColor: "#4A4A4A",
        width: "100%",
        height: "100%",
        top: "100%"
    });
    winAnimation.trans3d.setM34(-0.001);
    winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
    winAnimation.animation.duration = 300;
    nowPlaying.initialize();
    $.main.add(nowPlaying.getView());
    $.hamburger.addEventListener("click", function() {
        window.toggleLeftView();
    });
    $.main.addEventListener("click", function() {
        tempWin.add(detail.getView());
        tempWin.open();
        setTimeout(function() {
            Animator.animate(tempWin, {
                duration: 430,
                easing: Animator.EXP_OUT,
                top: 70
            });
        }, 200);
        winAnimation.animation.transform = winAnimation.trans3d.translate(0, 0, -100);
        setTimeout(function() {
            Animator.animate(window, {
                duration: 630,
                easing: Animator.BACK_OUT,
                transform: winAnimation.animation.transform
            });
        }, 200);
    });
    tempWin.addEventListener("click", function() {
        Animator.animate(tempWin, {
            duration: 530,
            easing: Animator.EXP_OUT,
            top: 768
        }, function() {
            tempWin.close();
        });
        winAnimation.animation.transform = winAnimation.trans3d.translate(0, 0, 0);
        Animator.animate(window, {
            duration: 430,
            easing: Animator.EXP_OUT,
            transform: winAnimation.animation.transform
        });
    });
    window.addEventListener("didChangeOffset", function(e) {
        e.offset >= 0 && ($.leftTable.opacity = e.offset / 240);
    });
    window.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
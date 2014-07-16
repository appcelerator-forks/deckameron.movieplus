function Controller() {
    function calcImageHeightWithFullscreenWidth(width, height) {
        return parseInt(Ti.Platform.displayCaps.platformWidth) / parseInt(width) * height;
    }
    function calcImageWidthWithFullscreenHeight(width, height) {
        return fullHeight / parseInt(height) * width;
    }
    function calcProperImageSize(width, height) {
        var h = calcImageHeightWithFullscreenWidth(width, height);
        if (h > fullHeight) {
            var w = calcImageWidthWithFullscreenHeight(width, height);
            return {
                width: parseInt(w),
                height: fullHeight
            };
        }
        return {
            width: parseInt(Ti.Platform.displayCaps.platformWidth),
            height: parseInt(h)
        };
    }
    function calcPosterPreviewPosAndSize(image) {
        var frame = {
            width: 0,
            height: 0,
            x: null,
            y: null
        };
        var temp = Ti.UI.createImageView({
            image: image
        });
        var img = temp.toImage();
        var size = calcProperImageSize(img.width, img.height);
        frame.width = size.width;
        frame.height = size.height;
        if (frame.width === parseInt(Ti.Platform.displayCaps.platformWidth) && fullHeight > frame.height) {
            frame.x = 0;
            frame.y = parseInt((fullHeight - frame.height) / 2);
        } else if (frame.height === fullHeight && frame.width < parseInt(Ti.Platform.displayCaps.platformWidth)) {
            frame.x = parseInt((parseInt(Ti.Platform.displayCaps.platformWidth) - frame.width) / 2);
            frame.y = 0;
        } else {
            frame.x = 0;
            frame.y = 0;
        }
        return frame;
    }
    function convertPosterThumbnailToPreview(view, preview) {
        var previewPoint = {
            start: {
                width: 100,
                height: 150,
                x: null,
                y: null
            },
            end: {
                width: 0,
                height: 0,
                x: null,
                y: null
            }
        };
        if (null !== view.rect) {
            var startPoint = view.convertPointToView({
                x: view.rect.x,
                y: view.rect.y
            }, preview);
            previewPoint.start.x = parseInt(startPoint.x) - offset.x;
            previewPoint.start.y = parseInt(startPoint.y) - offset.y;
            previewPoint.end = calcPosterPreviewPosAndSize(view.image);
        }
        return previewPoint;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tmp/hot/poster";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.movieDetailPosterWrapper = Ti.UI.createView({
        width: 120,
        height: 174,
        shadow: {
            shadowOpacity: .35,
            shadowRadius: 5,
            shadowOffset: {
                x: 0,
                y: 0
            }
        },
        id: "movieDetailPosterWrapper"
    });
    $.__views.movieDetailPosterWrapper && $.addTopLevelView($.__views.movieDetailPosterWrapper);
    $.__views.movieDetailPoster = Ti.UI.createImageView({
        width: 100,
        height: 150,
        id: "movieDetailPoster"
    });
    $.__views.movieDetailPosterWrapper.add($.__views.movieDetailPoster);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var self = this;
    var Animator = require("com.animecyc.animator");
    var previewCover = args.previewCover, preview = previewCover.children[0];
    var fullHeight = previewCover.rect.height;
    var offset = {
        x: 10,
        y: 12
    };
    self._id = parseInt(args.id);
    self.movieDetailPoster.image = args.url;
    var frame = calcPosterPreviewPosAndSize(args.url);
    var poster = Ti.UI.createView({
        backgroundImage: args.url,
        width: frame.width,
        height: frame.height,
        left: frame.x,
        top: frame.y,
        zIndex: 30
    });
    preview.addView(poster);
    self.movieDetailPoster.addEventListener("touchend", function(e) {
        var previewFrame = convertPosterThumbnailToPreview(e.source, previewCover);
        var area = -1;
        var copyImg = Ti.UI.createView({
            backgroundImage: e.source.image,
            width: previewFrame.start.width,
            height: previewFrame.start.height,
            left: previewFrame.start.x,
            top: previewFrame.start.y,
            zIndex: 30
        });
        preview.setCurrentPage(self._id);
        previewCover.show();
        previewCover.add(copyImg);
        Animator.animate(previewCover, {
            duration: 280,
            easing: Animator.EXP_OUT,
            backgroundColor: "#4A4A4A"
        });
        Animator.animate(copyImg, {
            duration: 400,
            easing: Animator.EXP_OUT,
            width: previewFrame.end.width,
            height: previewFrame.end.height,
            left: previewFrame.end.x,
            top: previewFrame.end.y
        }, function() {
            preview.show();
            previewCover.remove(copyImg);
        });
        60 > previewFrame.start.x ? area = 0 : previewFrame.start.x > 60 && 200 > previewFrame.start.x ? area = 1 : previewFrame.start.x > 200 && (area = 2);
        Ti.App.fireEvent("hot:movie:open:poster:preview", {
            area: area
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
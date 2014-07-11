var args = arguments[0] || {};
var self = this;

// Here's our base (full-size) image. 
// It's never displayed as-is.
var baseImage = Titanium.UI.createImageView({
    image: args.avatar,
    width: 500,
    height: "auto"
});
 
var croppedImage = baseImage.toImage().imageAsCropped({width:500, height:500, x:0, y:0}); 

self.movieDetailCastAvatar.image = croppedImage;
self.movieDetailCastName.text = args.name;

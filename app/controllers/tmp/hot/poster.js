var args = arguments[0] || {};
var self = this;

var Animator = require('com.animecyc.animator');
var winHeight = parseInt( Ti.Platform.displayCaps.platformHeight ) - 70; 

function calcImageHeightWithFullscreenWidth( width, height ) {
	return parseInt( Ti.Platform.displayCaps.platformWidth ) / parseInt( width ) * height;
}

function calcImageWidthWithFullscreenHeight( width, height ) {
	return winHeight / parseInt( height ) * width;
}

function calcProperImageSize( width, height ) {
	
	var h = calcImageHeightWithFullscreenWidth( width, height );

	if ( h > winHeight ) {
		
		var w = calcImageWidthWithFullscreenHeight( width, height );
		
		return {
			width: parseInt( w ),
			height: winHeight
		};
		
	} else {
		
		return {
			width: parseInt( Ti.Platform.displayCaps.platformWidth ),
			height: parseInt( h )
		};
	}
}

self.movieDetailPoster.image = args.url;

self.movieDetailPoster.addEventListener('touchstart', function() {
    
    var view = Ti.UI.createImageView({
    	image: args.url
    });
    
    var img = view.toImage();
    var size = calcProperImageSize( img.width, img.height );
    // alert("width: " + size.width + " height: " + size.height);
    
    view.width = 120;
    view.height = 174;

	args.win.add( view );

    var trans = Ti.UI.create2DMatrix().translate(0, 0);
	Animator.animate(view, {
        duration: 330,
        width: size.width,
        height: size.height,
        easing: Animator.BACK_OUT,
        transform: trans
    });

});

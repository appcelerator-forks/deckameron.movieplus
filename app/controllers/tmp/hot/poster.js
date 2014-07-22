var args = arguments[0] || {};
var self = this;

var Animator = require('com.animecyc.animator');
var previewCover = args.previewCover, preview = previewCover.children[0];
var fullHeight = previewCover.rect.height; 
var offset = {
	x: 10,
	y: 12
};

function calcImageHeightWithFullscreenWidth( width, height ) {
	return parseInt( Ti.Platform.displayCaps.platformWidth ) / parseInt( width ) * height;
}

function calcImageWidthWithFullscreenHeight( width, height ) {
	return fullHeight / parseInt( height ) * width;
}

function calcProperImageSize( width, height ) {
	
	var h = calcImageHeightWithFullscreenWidth( width, height );

	if ( h > fullHeight ) {
		
		var w = calcImageWidthWithFullscreenHeight( width, height );
		
		return {
			width: parseInt( w ),
			height: fullHeight
		};
		
	} else {
		
		return {
			width: parseInt( Ti.Platform.displayCaps.platformWidth ),
			height: parseInt( h )
		};
	}
}


function calcPosterPreviewPosAndSize( image ) {
	
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
    var size = calcProperImageSize( img.width, img.height );
    
    frame.width = size.width;
    frame.height = size.height;
	
    if ( ( frame.width === parseInt( Ti.Platform.displayCaps.platformWidth ) ) && ( frame.height < fullHeight ) ) {
    		
    	frame.x = 0;
    	frame.y = parseInt( ( fullHeight - frame.height ) / 2 );

    } else if ( ( frame.height === fullHeight ) && ( frame.width < parseInt( Ti.Platform.displayCaps.platformWidth ) ) ) {

    	frame.x = parseInt( ( parseInt( Ti.Platform.displayCaps.platformWidth ) - frame.width ) / 2 );
    	frame.y = 0;
    		
    } else {

    	frame.x = 0;
    	frame.y = 0;
    		
    }
    
    return frame;

}


function convertPosterThumbnailToPreview( view, preview ) {

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
	
    if ( null !== view.rect ) {
    	
    	var startPoint = view.convertPointToView({
    		x: view.rect.x, 
    		y: view.rect.y
    	}, preview );	
    	
    	previewPoint.start.x = parseInt( startPoint.x ) - offset.x;
    	previewPoint.start.y = parseInt( startPoint.y ) - offset.y;
    	
    	previewPoint.end = calcPosterPreviewPosAndSize( view.image );

    }
    
    return previewPoint;
	
}

self._id = parseInt( args.id );
self.movieDetailPoster.image = args.url;
var frame = calcPosterPreviewPosAndSize( args.url );
var poster = Ti.UI.createImageView({
    	image: args.url,
    	width: frame.width,
    	height: frame.height,
    	left: frame.x,
    	top: frame.y,
    	zIndex: 30
    });
preview.addView( poster );

self.movieDetailPoster.addEventListener('touchend', function( e ) {
	
	var previewFrame = convertPosterThumbnailToPreview( e.source, previewCover );
	var area = -1;
	
    var copyImg = Ti.UI.createView({
    	width: previewFrame.start.width,
    	height: previewFrame.start.height,
    	left: previewFrame.start.x,
    	top: previewFrame.start.y,
    	zIndex: 30,
    	backgroundImage: e.source.image
    });
    
    preview.setCurrentPage( self._id );
    previewCover.show();
	previewCover.add( copyImg );
	
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
    	previewCover.remove( copyImg );
    });
    
    /**
     * area:
     * poster could be within 3 areas:
     * - 0: pos < 60
     * - 1: 60 < pos < 200
     * - 2: pos > 200 
     */
    if ( previewFrame.start.x < 60 ) area = 0;
    else if ( previewFrame.start.x > 60 && previewFrame.start.x < 200 ) area = 1;
    else if ( previewFrame.start.x > 200 ) area = 2;
    Ti.App.fireEvent('hot:movie:open:poster:preview', {
    	area: area,
    	top: previewFrame.start.y
    });

});

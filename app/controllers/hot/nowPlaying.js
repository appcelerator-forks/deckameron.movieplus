var args = arguments[0] || {};

var Blur = require('bencoding.blur');
var nowPlayingCollection = Alloy.Collections.instance('nowPlaying');

var radius = 320;
var angle_gap = Math.PI / 16;
var skipUnit = 65;
var visibleRowsNum = 6;
var skip = 0;

var isReachTail = false;
var page = 1;

function toRadians( angle ) {
	return angle * Math.PI / 180;
}

function toDegrees( angle ) {
	return angle * 180 / Math.PI;
}

function getAngleAndSkipForXOffset( xOffset ) {
	var shift = xOffset % skipUnit;
	skip = parseInt( xOffset / skipUnit );
	var percentage = shift / skipUnit;
	return {
		angle: Math.abs( angle_gap * (1.0 - percentage) ),
		skip: skip
	};
}

function layoutCircleView( xOffset ) {
	var children = [];
	var angleAndSkipForXOffset = getAngleAndSkipForXOffset( xOffset );
	var firstCellAngle = angleAndSkipForXOffset.angle + 5 * angle_gap;
	var skip = angleAndSkipForXOffset.skip;
	
	for ( var i = skip; i < skip + visibleRowsNum; i++ ) {
	
		var angle = firstCellAngle;
		firstCellAngle += angle_gap;
		
		var y = radius * Math.sin( angle );
		if ( $.postersWheel.children[i] ) {
			$.postersWheel.children[i].transform = $.postersWheel.children[i].trans.translate(0, 330 - y).rotate(toDegrees(angle) - 90);
		}
	}
}

function addPosters( collection ) {
	if ( collection.length ) {
		collection.each(function( model ) {
			if ( ! model.get('isShown') ) {
				var postersRow = Ti.UI.createView({
					width: 65,
					height: 92
				});
				var poster = Ti.UI.createImageView({
					image: model.getPoster(),
					width: 57,
					height: 84,
					shadow: {
						shadowOpacity: 0.6,
						shadowRadius: 2,
						shadowOffset: {
							x: 0,
							y: 0
						}
					}
				});
			
				postersRow.trans = Ti.UI.create2DMatrix();	
				postersRow.add( poster );
			
				$.postersWheel.add( postersRow );
				model.set('isShown', true);
			}
		});

		isReachTail = true;
	}
}

function initialize() {
	
	// decelerate scroll speed.
	$.postersWheel.setDecelerationRate( Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST );
	
	nowPlayingCollection.getList(
	page,
	function() { /* success */
		
		var posterImage = this.at(0).getPoster();

		var imgView = Blur.createGPUBlurImageView({
    		height: "150%",
    		width: "150%",
    		top: 10,
    		image: posterImage,
    		blur: {
        		type: Blur.GAUSSIAN_BLUR, 
        		radiusInPixels: 6 
    		}
		});
		
		var posterView = Ti.UI.createImageView({
			id: 'poster',
			width: 170,
			height: 255,
			image: posterImage,
			borderWidth: 1,
			borderColor: "#C7C7C7",
			shadow: {
				shadowOpacity: 1,
            	shadowRadius: 9,
            	shadowOffset: {
            		x: 0,
                	y: 0
            	}
			},
			top: 130
		});
		
		$.content.add( imgView );
		imgView.add( posterView );

		addPosters( this );
		layoutCircleView( 0 );
		
	}, function( err ) { /* error */
		
		alert( err );

	});

}

$.postersWheel.addEventListener('scroll', function(e) {
	var self = this;

	if ( skip >= (16 + 20 * (page - 1) ) && isReachTail ) {

		isReachTail = false;
		
		nowPlayingCollection.getList(
		++page,
		function() {

			addPosters( this );
			
		}, function( err ) {
			
			alert( err );

		});
	}

	layoutCircleView( e.source.contentOffset.x );

});

$.postersWheel.addEventListener('scrollend', function(e) {
	var n = Math.floor($.postersWheel.contentOffset.x / 65);
	var delta = $.postersWheel.contentOffset.x - n * 65;
	if ( 0 === delta ) return;
	if ( delta > 32.5 )
		$.postersWheel.scrollTo( $.postersWheel.contentOffset.x + 65 - delta, 0 );
	else
		$.postersWheel.scrollTo( $.postersWheel.contentOffset.x - delta, 0 );
});

$.postersWheel.addEventListener('dragend', function(e) {
	if ( false === e.decelerate ) {
	var n = Math.floor($.postersWheel.contentOffset.x / 65);
	var delta = $.postersWheel.contentOffset.x - n * 65;
	if ( 0 === delta ) return;
	if ( delta > 32.5 )
		$.postersWheel.scrollTo( $.postersWheel.contentOffset.x + 65 - delta, 0 );
	else
		$.postersWheel.scrollTo( $.postersWheel.contentOffset.x - delta, 0 );
	}
});

exports.initialize = initialize;

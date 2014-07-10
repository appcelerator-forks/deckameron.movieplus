var args = arguments[0] || {};

var Blur = require('bencoding.blur');
var nowPlayingCollection = Alloy.Collections.instance('nowPlaying');

var radius = 320;
var angle_gap = Math.PI / 16;
var skipUnit = 65;
var visibleRowsNum = 6;
var skip = 0;

// set of flags.
var isReachTail = false;
var page = 1;
var fetchingCompleted = false;

var trans = Ti.UI.create3DMatrix();

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
	
	for ( var i = skip; i < skip + visibleRowsNum; i++ ) {
	
		var angle = firstCellAngle;
		firstCellAngle += angle_gap;
		
		var y = radius * Math.sin( angle );
		if ( $.postersWheel.children[i] ) {
			$.postersWheel.children[i].setTransform( trans.translate( 0, 330 - y, 0 ).rotate( toDegrees(angle) - 90, 0, 0, 1 ) );
		}
	}
}

function addPosters( collection ) {
	var posters = [];

	if ( collection.length ) {
		collection.each(function( model ) {
			if ( ! model.get('isShown') ) {
				var posterRow = Ti.UI.createView({
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
			
				posterRow.add( poster );
				posters.push( posterRow );
				model.set( 'isShown', true );
			}
		});
		
		if ( posters.length ) $.postersWheel.add( posters );
		$.postersWheel.setDecelerationRate( Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST );

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

        var nowPlayingPoster = Alloy.createController('hot/nowPlayingPoster', {
                posterImage: posterImage
        });
		$.content.add( nowPlayingPoster.getView() );

		addPosters( this );
		layoutCircleView( 0 );
		
	}, function( err ) { /* error */
		
		alert( err );

	});

}

$.postersWheel.addEventListener('scroll', function(e) {
	var self = this;
	
	if ( ( skip >= ( nowPlayingCollection.length - 5 ) ) && isReachTail ) {

		isReachTail = false;
		
		nowPlayingCollection.getList(
		++page,
		function() {

			fetchingCompleted = true;
			
		}, function( err ) {
			
			alert( err );

		});
	}

	layoutCircleView( e.source.contentOffset.x );

});

$.postersWheel.addEventListener('scrollend', function( e ) {
	
	var self = this;
	
	if ( fetchingCompleted ) {
		fetchingCompleted = false;
		addPosters( nowPlayingCollection );
	}
	
	var n = Math.floor(e.source.contentOffset.x / 65);
	var delta = e.source.contentOffset.x - n * 65;
	if ( 0 === delta ) return;
	if ( delta > 32.5 )
		$.postersWheel.scrollTo( e.source.contentOffset.x + 65 - delta, 0 );
	else
		$.postersWheel.scrollTo( e.source.contentOffset.x - delta, 0 );
});

$.postersWheel.addEventListener('dragend', function( e ) {

	if ( false === e.decelerate ) {
	var n = Math.floor(e.source.contentOffset.x / 65);
	var delta = e.source.contentOffset.x - n * 65;
	if ( 0 === delta ) return;
	if ( delta > 32.5 )
		$.postersWheel.scrollTo( e.source.contentOffset.x + 65 - delta, 0 );
	else
		$.postersWheel.scrollTo( e.source.contentOffset.x - delta, 0 );
	}
});

exports.initialize = initialize;

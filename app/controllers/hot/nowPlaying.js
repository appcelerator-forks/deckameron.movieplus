var args = arguments[0] || {};
var collectionView;
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
	//var posters = [];

	if ( collection.length ) {
		collection.each(function( model ) {
			//if ( ! model.get('isShown') ) {
				collectionView.addItem(model.getPoster());
			//}
		});
		
		//if ( posters.length ) $.postersWheel.add( posters );
		//$.postersWheel.setDecelerationRate( Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST );

		isReachTail = true;
	}
}

function initialize() {
	
	// decelerate scroll speed.
	//$.postersWheel.setDecelerationRate( Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST );

	nowPlayingCollection.getList(
	page,
	function() { /* success */
		
		var posterImage = this.at(0).getPoster();

        var nowPlayingPoster = Alloy.createController('hot/nowPlayingPoster', {
                posterImage: posterImage
        });
		$.content.add( nowPlayingPoster.getView() );

		addPosters( this );
		//layoutCircleView( 0 );
		
	}, function( err ) { /* error */
		
		alert( err );

	});
	var circleMenu = require("cn.ld.circlemenu");
	
	collectionView = circleMenu.createView();
	$.postersWheel.add(collectionView);
}
exports.initialize = initialize;

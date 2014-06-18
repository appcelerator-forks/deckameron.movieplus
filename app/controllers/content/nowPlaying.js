var args = arguments[0] || {};

var radius = 320;
var angle_gap = Math.PI / 16;
var skipUnit = 65;
var visibleRowsNum = 6;
var paths = [];

function toRadians( angle ) {
	return angle * Math.PI / 180;
}

function toDegrees( angle ) {
	return angle * 180 / Math.PI;
}

function addPosters( posters ) {
	if ( posters ) {
		_.each(posters, function( path ) {
			var postersRow = Ti.UI.createView({
				width: 65,
				height: 92
			});
			var poster = Ti.UI.createImageView({
				image: path,
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
			postersRow.add(poster);
			
			$.nowPlaying.add(postersRow);
		});
	}
}

function getAngleAndSkipForXOffset( xOffset ) {
	var shift = $.nowPlaying.getContentOffset().x % skipUnit;
	var skip = parseInt( $.nowPlaying.getContentOffset().x / skipUnit );
	var percentage = shift / skipUnit;
	return {
		angle: Math.abs( angle_gap * (1.0 - percentage) ),
		skip: skip
	};
}

function layoutCircleView() {
	var children = [];
	var angleAndSkipForXOffset = getAngleAndSkipForXOffset( $.nowPlaying.getContentOffset().x );
	var firstCellAngle = angleAndSkipForXOffset.angle + 5 * angle_gap;
	var skip = angleAndSkipForXOffset.skip;

	for ( var i = skip; i < skip + visibleRowsNum; i++ ) {
	
		var angle = firstCellAngle;
		firstCellAngle += angle_gap;
		
		var y = radius * Math.sin( angle );
		if ( $.nowPlaying.children[i] ) {
			$.nowPlaying.children[i].transform = $.nowPlaying.children[i].trans.translate(0, 330 - y).rotate(toDegrees(angle) - 90);
		}
	}
}

// var allPosters = $.nowPlaying.getChildren();
// for ( var j = 0; j < allPosters.length; j++ ) {
	// allPosters[j].trans = Ti.UI.create2DMatrix();	
// }

// layoutCircleView();

$.nowPlaying.addEventListener('scroll', function(e) {
	layoutCircleView();
});

exports.addPosters = addPosters;
exports.layoutCircleView = layoutCircleView;
exports.paths = paths;

var args = arguments[0] || {};

var radius = 320;
var angle_gap = Math.PI / 16;
var skipUnit = 65;
var visibleRowsNum = 6;

function toRadians( angle ) {
	return angle * Math.PI / 180;
}

function toDegrees( angle ) {
	return angle * 180 / Math.PI;
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

var allPosters = $.nowPlaying.getChildren();
for ( var j = 0; j < allPosters.length; j++ ) {
	allPosters[j].trans = Ti.UI.create2DMatrix();	
}

layoutCircleView();

$.nowPlaying.addEventListener('scroll', function(e) {
	layoutCircleView();
});
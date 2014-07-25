var args = arguments[0] || {};
var castDetailController = Alloy.createController( 'tmp/hot/castDetail/index' );

$.tmpNav.height = Ti.Platform.displayCaps.platformHeight - 69;

Ti.App.addEventListener('hot:movie:prepare:open', function() {
	
	$.tmpNav.open();

});

Ti.App.addEventListener('cast:detail:open', function( e ) {

	$.tmpNav.openWindow( castDetailController.getView(), {
		animated: true
	});

});

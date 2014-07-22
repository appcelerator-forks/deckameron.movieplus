// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// custom array insert methods.
// ported from http://stackoverflow.com/questions/586182/insert-item-into-array-at-a-specific-index.
// really cool.

require('com.logicdesign.TiParallaxTableViewHeader');

Array.prototype.insert = function( index ) {
	index = Math.min( index, this.length );
	arguments.length > 1
	&& this.splice.apply( this, [index, 0].concat( [].pop.call(arguments) ) )
	&& this.insert.apply( this, arguments );
	
	return this;
};

Array.prototype.prepend = function() {
	var args = [0];
	for ( var i = 0; i < arguments.length; i++ ) args.push( arguments[i] );
	return this.insert.apply( this, args );
};

Array.prototype.append = function() {
	var args = [ this.length ];
	for ( var i = 0; i < arguments.length; i++ ) args.push( arguments[i] );
	return this.insert.apply( this, args );
};

// Ti.BlurView require <ImageView> being created in advance.
Ti.UI.createImageView();

Alloy.Collections.instance('nowPlaying');
Alloy.Collections.instance('upComing');
Alloy.Collections.instance('movieDetail');

var args = arguments[0] || {};
var self = this;

id = args.id;

// Models
var castDetailCollection = Alloy.Collections.instance('castDetail');

if ( ! castDetailCollection.get( id ) ) {
		
	var castDetailModel = Alloy.createModel('castDetail', {
		id: id
	});
	
	castDetailCollection.add( castDetailModel );

	castDetailModel.getInfo(
	function() {
		
	}, function( err ) {
		
		alert( "get cast detail error: " + err );
		
	});

}

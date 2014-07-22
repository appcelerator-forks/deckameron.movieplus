
var theMovieDb = require('themoviedb');

exports.definition = {
	config: {

		adapter: {
			type: "properties",
			collection_name: "castDetail"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here

			getInfo: function( success, error ) {
				
				var self = this;
				
				theMovieDb.people.getById({
					
					"id": self.id
				
				}, function ( data ) {
					
					data = JSON.parse( data );
					if ( data.id === self.id ) self.set( data );
					else self.clear();
					
					if ( _.isFunction( success ) ) success.call( self );

				}, function ( err ) {
					
					if ( _.isFunction( error ) ) error.call( self, err );

				});
				
			},
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};
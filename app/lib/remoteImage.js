
module.exports = {
	 /* modified version of https://gist.github.com/1243697 */
  	_getExtension: function(fn) {
    	// from http://stackoverflow.com/a/680982/292947
    	var re = /(?:\.([^.]+))?$/;
    	var tmpext = re.exec(fn)[1];
    	return ( tmpext ) ? tmpext : '';
  	},
  	
  	load: function( a, success, error ) {
    	a = a || {};
    	var md5;
    	var needsToSave = false;
    	var savedFile;

    	if ( a.filePath ) {
    		
      		md5 = Ti.Utils.md5HexDigest( a.filePath ) + this._getExtension( a.filePath );
      		
      		savedFile = Titanium.Filesystem.getFile( Titanium.Filesystem.applicationDataDirectory, md5 );

      		if ( savedFile.exists() ) {
      			
        		success( savedFile );
        		
      		} else {
      			
        		needsToSave = true;

      		}

    	}
    	
    	if ( true === needsToSave ) {
    		
    		var xhr = Titanium.Network.createHTTPClient();
 
    		xhr.onload = function( e ) {

            	if ( 4 === xhr.readyState ) {
            		
                	if ( 200 === xhr.status ) {
                		
    					if ( _.isFunction( success ) ) success( e.source.responseData );
                    	
                	} else {
                		
                    	if ( _.isFunction( error ) ) xhr.onerror = error;
                    	
                	}
                	
            	} else {
            		
                	if ( _.isFunction( error ) ) xhr.onerror = error;

            	}
    			
    		};
    		
    		if ( _.isFunction( error ) ) xhr.onerror = error;

    		xhr.setTimeout( 30000 );
    		xhr.open( 'GET', a.filePath );
    		xhr.send();
 
    	}
    
  	}

};

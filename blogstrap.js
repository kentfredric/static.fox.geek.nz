/* vim: et sw=4 ts=4 */
jQuery(function($){
    var debug = null;

    var features  = {};

    var newfeature = function( name , type, config ){ 
        features[name] = { enabled: null }; 
        var feature = features[name];
        if ( type == "name" ) { 
            feature.name = config;
        }
        if ( type == "code" ) {
            feature.code = config;
        }
    };

    newfeature( 'console', 'code',function() {
                jQuery.console = function(){};
                if ( debug ){ 
                    if ( console ){ 
                        jQuery.console = function(){ console.log.apply( $, arguments ); };
                    } else {
                        jQuery.console = function(){ alert( arguments ); };
                    }
                }
                return 1;
    });
    newfeature('localscript', 'code', function(){ 
            jQuery.localscript = function(){ 
                    var callparams = arguments;
                    callparams[0] = 'http://static2.fox.geek.nz/' + callparams[0];
                    return $.getScript.apply( $, callparams );
            };
            return 1;
    });
    newfeature('beautyOfCode', 'name','jquery.beautyOfCode.js');
    newfeature('beautyConf', 'name','beautyconf.js' );
    newfeature('googleanalytics', 'name','gat.js' );
    var toCallback = function( arg ){
        if ( ! arg ){ 
            return function(){ };
        }
        return arg;
    };
    var logFail = function( name ){ 
        if ( jQuery.hasFeature( "console" ) ) {
            jQuery.console("Enabling feature " + name + " Did not work");
        } else { 
            alert("Enabling feature " + name + " did not work"); 
        }
    };

    jQuery.hasFeature = function( name ) { 
	    return features[name].enabled !== null;
    }
    jQuery.enableFeature = function ( name, callback, xargs ) {
        if( jQuery.hasFeature(name) ) { return toCallback(callback).apply(this,xargs); }
        var feature = features[name];
        if ( feature.code ) { 
            if ( feature.code() ){ 
                features[name].enabled = 1;
                return toCallback(callback).apply(this,xargs);
            } else { 
                return logFail( name );
            }
        }
        if ( feature.name ){ 
            jQuery.enableFeature('localscript', function(){ 
                jQuery.localscript(feature.name, function(){ 
                    features[name].enabled = 1;
                    toCallback(callback).apply(this, xargs );
                });	
            });
            return;
        }
       }

    $.enableFeature('console');  
    $.enableFeature('beautyConf'); 
    $.enableFeature('googleanalytics');
});


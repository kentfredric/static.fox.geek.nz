jQuery(function($){
    var debug = null;
    var features = {
        console: { enabled: null , code: function() { 
            jQuery.console = function(){};
            if ( debug ){ 
                if ( console ){ 
                    jQuery.console = function(){ console.log.apply( $, arguments ); };
                } else {
                    jQuery.console = function(){ alert( arguments ); };
                }
            }
            return 1;
        }},
        localscript: { enabled: null, code: function(){ 
            jQuery.localscript = function(){ 
                    var callparams = arguments;
                    callparams[0] = 'http://static.fox.geek.nz/' + callparams[0];
                    return $.getScript.apply( $, callparams );
            };
            return 1;
        }},
        beautyOfCode: { enabled: null, name: 'jquery.beautyOfCode.js' }, 
        beautyConf: { enabled: null, name: 'beautyconf.js' },
        googleanalytics: { enabled: null, name: 'gat.js' }
    };
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
  
    $.enableFeature('beautyOfCode', function(){
        $.enableFeature('beautyConf'); 
    } );
    $.enableFeature('googleanalytics');
});


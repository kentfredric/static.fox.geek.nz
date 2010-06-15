jQuery(function($){
    var debug = null;

    jQuery.console = function() { } 

    if ( debug && console ){ 
	jQuery.console = function(){ console.log.apply( $, arguments ) };
    }
    $.getScript('http://static.fox.geek.nz/jquery.beautyOfCode.js', function(){
      $.getScript('http://static.fox.geek.nz/beautyconf.js');
    });
    $.getScript('http://static.fox.geek.nz/gat.js');
 
});


jQuery(function($){

   $.console("init");

   var ua       = 'UA-11853300-1';
   var gaJsHost = (('https' == document.location.protocol) ? 'https://ssl.' : 'http://www.');

   $.getScript(gaJsHost + 'google-analytics.com/ga.js', function(){

     $.console("fetched"); 

     $(function($){

       $.console("gatted"); 
       var pageTracker = _gat._getTracker(ua);
       pageTracker._trackPageview();

     }); /* onLoad Context */

   }); /* getScript Context */

}); /* onLoad Plugin Context */

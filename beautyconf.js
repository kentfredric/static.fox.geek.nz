jQuery(function($){

  var format = function(){
      $('code.perl').each(function(){
          var node = $(this).clone();
          node.removeClass('perl');
          var wrap = document.createElement('pre');
          $(wrap).append(node);
          $(this).replaceWith( wrap );
          $(wrap).beautifyCode('Perl');
      });
      $('code.darkperl').each(function(){
          var node = $(this).clone();
          node.removeClass('perl');
          var wrap = document.createElement('pre');
          $(wrap).append(node);
          $(this).replaceWith( wrap );
          $(wrap).beautifyCode('Perl',{ gutter: false, "class-name": "darkperlmod" });
 
      });
      $('code.ini').each(function(){
          var node = $(this).clone();
          node.removeClass('ini');
          var wrap = document.createElement('pre');
         $(wrap).append(node);
          $(this).replaceWith( wrap );
          $(wrap).beautifyCode('INI');

      });
      $("div.darkperlmod div.lines").attr('style','background-color: rgba(200,255,200.0.5) !important');
  };

  $.beautyOfCode.init({
    brushes: [ 'Perl' ],
    theme: 'Default',
    config: {
      bloggerMode: true,
    },
    ready: function(){
     jQuery.beautyOfCode.utils.loadAllScripts( ['http://static.fox.geek.nz/initbrush.js'], format);
    }
 });
});


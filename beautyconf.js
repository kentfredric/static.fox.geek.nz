jQuery(function($){

    var format = function(){
    var nodeswitch = function(match, strip, cast ) {
        $(match).each(function(){
            var node = $(this).clone();
            node.removeClass(strip);
            var wrap = document.createElement('pre');
            $(wrap).append(node);
            $(this).replaceWith(wrap);
            if( jQuery.isFunction(cast) ) {
                cast(wrap);
            } else {
                $(wrap).beautifyCode(cast);
            }
        });
    };
    nodeswitch('code.perl','perl','Perl');
    nodeswitch('code.bash','bash','bash');
    nodeswitch('code.plaintext','plaintext','plain');
    nodeswitch('code.darkperl','darkperl',function(wrap){ 
          $(wrap).beautifyCode('Perl',{ gutter: false, "class-name": "darkperlmod" });
    });
    nodeswitch('code.ini', 'ini', 'INI' );
    $("div.darkperlmod div.lines").attr('style','background-color: rgba(200,255,200.0.5) !important');
  };

  $.beautyOfCode.init({
    brushes: [ 'Perl' , 'Bash', 'Plain'],
    theme: 'Default',
    config: {
      bloggerMode: true,
    },
    ready: function(){
     jQuery.beautyOfCode.utils.loadAllScripts( ['http://static.fox.geek.nz/initbrush.js'], format);
    }
 });
});


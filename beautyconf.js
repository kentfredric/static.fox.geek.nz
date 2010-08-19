jQuery(function($){

    var nodeswitch = function(match,strip,cast) {
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
    var prenodeswitch = function( match , cast ) {
        $('pre.' + match).each(function(){
            var node = $(this).clone();
            node.removeClass(match);
            var wrap = document.createElement('pre');
            var code = document.createElement('code');
            $(wrap).append(code);
            $(code).append(node.contents());
            $(this).replaceWith(wrap);
            if( jQuery.isFunction(cast) ){
                cast(wrap);
            } else {
                $(wrap).beautifyCode(cast);
            }
        });
    };

    var format = function(){
        prenodeswitch('perl', 'Perl');
        prenodeswitch('bash', 'bash');
        prenodeswitch('plaintext','plain');
        prenodeswitch('ini','INI');
        prenodeswitch('darkperl', function(wrap){ 
            $(wrap).beautifyCode('Perl',{ gutter: false, "class-name": "darkperlmod" });
        });
    /*  
        deprecated: <pre> works better than <code>   
        nodeswitch('code.perl','perl','Perl');
        nodeswitch('code.bash','bash','bash');
        nodeswitch('code.plaintext','plaintext','plain');
        nodeswitch('code.darkperl','darkperl',function(wrap){ 
            $(wrap).beautifyCode('Perl',{ gutter: false, "class-name": "darkperlmod" });
        });
        nodeswitch('code.ini', 'ini', 'INI' ); */
        $("div.darkperlmod div.lines").attr('style','background-color: rgba(200,255,200,0.5) !important');
        $("div.darkperlmod .alt1 .content").attr('style','background-color: #DDDDDD !important');
        $("div.darkperlmod .alt2 .content").attr('style','background-color: #D8D8D8 !important');
    };

    var config = {
        brushes: ['Perl','Bash','Plain'],
        theme: 'Default',
        config: {
            bloggerMode: true,
        },
        ready: function(){
            jQuery.beautyOfCode.utils.loadAllScripts( ['http://static2.fox.geek.nz/initbrush.js'], format);
        }
    };
    $.enableFeature('beautyOfCode', function(){ 
        $.beautyOfCode.init(config);
    });
});


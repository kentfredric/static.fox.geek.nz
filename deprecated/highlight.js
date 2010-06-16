(function(jQuery){

 var registry_cache;
 var registry = function(){
  if ( registry_cache ){ return registry_cache; }
  registry_cache = {};
  $.each(dp.sh.Brushes,function(index,obj){ 
    if( obj.Aliases === null ){
      return 1;
    }
    $.each(obj.Aliases,function(alias_index, alias_name){
      registry_cache[alias_name] = obj;
    });
  });
  return registry_cache;
 };

 jQuery.fn.shighlight = function(){ 
  var items = this;
  var options = arguments;
  console.log(items);
  $(items).each(function(){
    var item = this;
    var brushtype = registry_cache()[options['language']];
    var highlighter =  new dp.sh.Brushes[ brushtype ];
    var styleNode = document.createElement('style');
    styleNode.setAttribute('type', 'text/css');

      if(styleNode.styleSheet) // for IE
      {
        styleNode.styleSheet.cssText = highlighter.Style;
      }
      else // for everyone else
      {
        var textNode = document.createTextNode(highlighter.Style);
        styleNode.appendChild(textNode);
      }
    $('head').append(styleNode);
    var text = item['InnerHTML'];
    text.replace(/\s*<!--/,'');
    text.replace(/-->\s*$/,'');
    text.replace(/\s*<![CDATA[/,'');
    text.replace(/]]>\s*$/,'');
    $(item).text(text);
    console.log(text);
 
    highlighter.Highlight(item['InnerHTML']);
    highlighter.source = item;
    $(item).before(highlighter.div);
  });
 };
 console.log(">>");
 jQuery(function($){

   var inject_css, load_core, load_plugin;
   var trace = function(){ if ( console ){ console.log( arguments ) } };
   var mode = 0;
   var resolve = function(simple, fallback){
    if ( mode == 1 && fallback ){ return fallback; }
    return 'http://static.fox.geek.nz/' + simple ;
   };
   var css_file = resolve('Syntax.css');
   var core     = resolve('shCore.js','http://syntaxhighlighter.googlecode.com/svn/trunk/Scripts/shCore.js');
   var languages = { 
    'perl': resolve('shBrushPerl.js','http://nevstokes.com/includes/syntax/scripts/shBrushPerl.js'),
    'bash': resolve('shBrushBash.js','http://nevstokes.com/includes/syntax/scripts/shBrushPerl.js')
   };

   inject_css = function(file, node, callback ){ 
      var style = document.createElement('style'); 
      var link  = document.createElement('link'); 
      link.href = file; 
      link.rel  = 'stylesheet';
      style.textContent = '@import url(' + file + ')';
      style.type = "text/css";
      var done = 0;
      link.onload = style.onload = style.onload = style.onreadystatechange = function(){ 
        if ( done === 1 ){  return ; }
        done = 1;
        callback(arguments);
      };
      $(node).append(link);
      $(node).append(style);
   };

   load_core = function(callback){ 
    trace("Load Core",arguments);
    $.getScript(core, callback);
   };

   load_plugin = function(name, callback){ 
    trace("Load Plugin", arguments);
    $.getScript(languages[name], callback);
   };

   inject_css( css_file, document.getElementsByTagName("head")[0], function(){});
   load_core(function(){
      load_plugin('perl',function(){
        dp.SyntaxHighlighter.BloggerMode();
        $("code.perl").shilight({language: perl});
      });
      load_plugin('bash',function(){
        dp.SyntaxHighlighter.BloggerMode();
        $("code.bash").shilight({language: bash});
      });

   });
 });
})(jQuery);

(function(sh){

sh.brushes.INI = function(){ 

  this.regexList = [
  { regex: new RegExp(';.*$','gm'), css: 'comment' },
  { regex: new RegExp('^\s*[[][A-Za-z]+.*]', 'mg'), css: 'symbol' },
//  { regex: new RegExp('^[^=][^=]*=..*$','mg'), css: 'value' },

  { regex: new RegExp('^[^[=]+(?==)','mg'), css: 'variable' },
  { regex: new RegExp('=(?=..*$)','mg'), css: 'keyword' },
//  { regex: new RegExp('^[^=][^=]*=..*$','mg'), css: 'value' },

  ];

}

sh.brushes.INI.prototype = new sh.Highlighter();
sh.brushes.INI.aliases = ['ini','Ini','INI'];
})(SyntaxHighlighter);

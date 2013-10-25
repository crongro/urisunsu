// EUC-KR -> UTF8 USING ICONV

var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
//var iconv = new Iconv('UTF-8', 'EUC-KR//TRANSLIT//IGNORE');


$('div.ct_wrp ul li .tm_info1 span').each(function() {
    var result = $(this).text();
    var buf = new Buffer(result.length);
    buf.write(result, 0, result.length, 'binary');
    console.log(" -" + iconv.convert(buf).toString());
});



var fs = require('fs');
var NodeXls = require('../lib');

var data = [{
    foo: "aaa",
    stux: new Date(),
    boom: "boom"
},{
    foo: "bbb",
    stux: new Date(),
    boom: "boom again"
}]
var tool = new NodeXls();
var xls = tool.json2xls(data, {order:["stux", "foo", "boom"], fieldMap: {boom: "hello"}});
fs.writeFileSync('output.xlsx',xls, 'binary');
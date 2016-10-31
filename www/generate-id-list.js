var fs = require('fs');

var ids = [];
var dir = fs.readdirSync('draw/metadata');
for (var i = 0; i < dir.length; i++) {
	var filename = dir[i];
	ids.push(filename.substr(0, filename.length - 5))
}

fs.writeFile('draw/metadata-id-list.json', JSON.stringify(ids));
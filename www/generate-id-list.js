var fs = require('fs');

var ids = [];
var dir = fs.readdirSync('draw/metadata');
for (var i = 0; i < dir.length; i++) {
	var filename = dir[i];
	if (filename.substr(0, 1) == '.') continue;
	ids.push(filename.substr(0, filename.length - 5))
}

fs.writeFile('draw/metadata-id-list.json', JSON.stringify(ids));
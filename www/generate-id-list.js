var fs = require('fs');
var jsonFile = process.argv[2];

// Input file
if (jsonFile == undefined) {
	console.error('Please specify a JSON file to parse!');
	process.exit(1);
}
if (!fs.existsSync(jsonFile)) {
	console.error('Specified file does not exist!', jsonFile);
	process.exit(2);
}

var ids = [];
var data = require('./' + jsonFile);
for (var i = 0; i < data.length; i++) {
	// Try and find an ID
	if (data[i].hasOwnProperty('ID'))
		var id = data[i].ID.toString();
	else if (data[i].hasOwnProperty('id'))
		var id = data[i].id.toString();
	else {
		console.warn('Cannot determine ID:', data[i]);
		continue;
	}

	ids.push(id)
}

fs.writeFile('draw/metadata-id-list.json', JSON.stringify(ids));

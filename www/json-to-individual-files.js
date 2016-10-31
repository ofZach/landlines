var fs = require('fs');
var jsonFile = process.argv[2];
var folderPath = process.argv[3] || 'metadata';

// Input file
if (jsonFile == undefined) {
	console.error('Please specify a JSON file to parse!');
	process.exit(1);
}
if (!fs.existsSync(jsonFile)) {
	console.error('Specified file does not exist!', jsonFile);
	process.exit(2);
}

// Create output folder if needed
if (!fs.existsSync(folderPath)) {
	fs.mkdirSync(folderPath);
}

var data = require('./' + jsonFile);
for (var i = 0; i < data.length; i++) {
	// Try and find an ID
	if (data[i].hasOwnProperty('ID'))
		var filename = folderPath + '/' + data[i].ID + '.json';
	else if (data[i].hasOwnProperty('id'))
		var filename = folderPath + '/' + data[i].id + '.json';
	else {
		console.warn('Cannot determine ID:', data[i]);
		continue;
	}

	// Convert keys to lowercase
	for (var key in data[i]) {
		var keyLower = key.toLowerCase();
		if (key == keyLower) continue;

		var val = data[i][key];
		delete data[i][key];
		data[i][keyLower] = val;
	}

	fs.writeFileSync(filename, JSON.stringify(data[i]));
}

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

var output = {};
var data = require('./' + jsonFile);
for (var i = 0; i < data.length; i++) {
	var id = data[i].id;
	delete data[i].id;
	output[id] = data[i];
	
}

fs.writeFileSync('metadata-converted.json', JSON.stringify(output));
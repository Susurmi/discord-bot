const fs = require('fs');
const path = require('path');

module.exports = (directory, onlyFolders = false) => {
	const filesArray = [];

	const files = fs.readdirSync(directory, { withFileTypes: true });

	files.forEach((file) => {
		const filePath = path.join(directory, file.name);

		if (onlyFolders) {
			if (file.isDirectory()) {
				filesArray.push(filePath);
			}
		} else if (file.isFile() && file.name.includes('.js')) {
			filesArray.push(filePath);
		}
	});

	return filesArray;
};

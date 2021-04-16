const express = require("express");
const app = express();
const path = require('path');

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, function () {
	console.log(`Server has been started on port: ${PORT}`);
});

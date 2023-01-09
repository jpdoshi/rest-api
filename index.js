const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let data = require('./data.json'); // dataset
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read Data
app.get('/api/data', (req, res) => {
	res.json(data);
});

// Create Data
app.post('/api/data', (req, res) => {
	const obj = req.body;

	data.push(obj);
	res.send("Object Added");
});

// Search Data:
app.get('/api/data/:id', (req, res) => {
	const id = req.params.id;

	for (let obj of data) {
		if (obj.id == id) {
			res.json(obj);
			return;
		}
	}

	res.status(404).send("Object ID:" + id + " Not Found");
});

// Delete Data:
app.delete('/api/data/:id', (req, res) => {
	const id = req.params.id;

	data = data.filter(obj => {
		if (obj.id != id) {
			return true;
		}
		return false;
	});

	res.send("Object Removed");
});

// Update Entire Record:
app.put('/api/data/:id', (req, res) => {
	const id = req.params.id;
	const newObj = req.body;

	for (let obj of data) {
		if (obj.id == id) {
			obj.id = newObj.id;
			obj.brand = newObj.brand;
			obj.model = newObj.model;
			obj.year = newObj.year;

			res.send("Object Updated");
			return;
		}
	}

	res.status(404).send("Object ID:" + id + " Not Found");
});

app.listen(port, () => {
	console.log('Server is Listening on port:' + port);
});

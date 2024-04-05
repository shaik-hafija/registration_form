const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/sample';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const form = require('./models/registraton');
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("node:path");
const bodyParser = require("body-parser");
const Router = express.Router();
const PORT = process.env.PORT || 3000

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
    console.log('Connected successfully to MongoDB');
    console.log(`Server is running on http://localhost:${PORT}`);

});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));



app.post('/sign_up', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone_number": phone
    }
    console.log(data);
    db.collection('registrations').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.sendFile(path.join(__dirname, 'signup_success.html'));
})


app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.sendFile(path.join(__dirname, 'index.html'));  // Updated path

}).listen(3000)



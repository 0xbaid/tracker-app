const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const auth = require('./middleware/auth')

const PORT = process.env.PORT || 5000;

//connect database
let mongoURI = process.env.MONGOLAB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => console.log('mongoDB Connected!'));

mongoose.connection.on('error', (err) =>
  console.error('Error connected to mongoDB', err)
);

//parsing data to json
app.use(bodyParser.json());
//define routes
app.use(authRoute);

app.get('/', auth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

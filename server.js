const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/authRoutes');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

//connect database
let mongoURI = process.env.MONGOLAB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => console.log('mongoDB Connected!'));

mongoose.connection.on('error', (err) => console.error('Error connected to mongoDB',err) )

//define routes
app.use(authRoute)

app.get('/', (req, res) => {
  res.send('Api is running');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

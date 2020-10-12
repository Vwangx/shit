const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.use(cors());

app.use('/', require('./routes/authRoutes'))

const start = async () => {
  try {
    await mongoose.connect('mongodb://10.10.10.3/db',
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    4000)
  } catch (e) {
    console.log('Error...', e.message)
    process.exit(1)
  }
}

start()

app.listen(4000, () => {
  console.log(`Server started on http://localhost:4000`);
});
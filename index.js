const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config()
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api', routes);

// db config
const dbURI = process.env.MONGO_URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


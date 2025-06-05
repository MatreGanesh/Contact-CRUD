const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./MongoDB/db')

const app = express();

app.use(cors());

//dotenv Imports
require('dotenv').config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//mongoDD Connection
connectDB(MONGODB_URL);

/* Middlewares*/

app.use(express.json());
app.use(bodyParser.json());



/* Import Routing File Start */
const contactForm = require('./Routes/ContactForm_Route')
const signUp = require('./Routes/NewSignUp')

//Use Routes
app.use('/api/contactForm', contactForm);
app.use('/api/login', signUp);



app.listen(PORT, () => {
    console.log(`Server is running on localhost : ${PORT}`);
})
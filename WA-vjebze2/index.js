const express = require('express');
const app = express();
const propertiesRouter = require('./routes/properties');
const offersRouter = require('./routes/offers');

app.use(express.json());

// Koristi rute za nekretnine i ponude
app.use('/properties', propertiesRouter);
app.use('/offers', offersRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
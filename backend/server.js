const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', imageRoutes); // localhost:5000/api/upload

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

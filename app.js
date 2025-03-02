const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/database');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imageupload/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

// Make the imageupload folder publicly accessible
app.use('/imageupload', express.static('imageupload'));

sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

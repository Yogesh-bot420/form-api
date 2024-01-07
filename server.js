const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const path = require("path");

// Enable CORS for all routes
app.use(cors());
const port = 3002;

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // Extracting the file extension
        const ext = path.extname(file.originalname);

        // Constructing the new filename with the original extension
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});


const upload = multer({ storage: storage });

// Endpoint to handle the POST request
app.post('/upload', 
    upload.fields([
        { name: 'images', maxCount: 4 },
        { name: 'firstFile', maxCount: 1 },
        { name: 'secondFile', maxCount: 1 }
    ]), 
    (req, res) => {
        console.log(req.files);
        res.send('Files received');
    }
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { corruptFile } = require('./utils/corruptFile');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
var colors = require('colors');
const multer = require('multer');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});

app.post('/api/corrupt', upload.single('file'), async (req, res) => {
    try {
        /* Extracting information from the request object. */
        const file = req.file;
        const corruptionType = req.headers['corruption-type'] || 'random';
        const corruptionStrength = req.headers['corruption-strength'] || '50';

        console.log('Incoming file: '.cyan + file.path.yellow);
        console.log('Corruption type: '.cyan + corruptionType.yellow);
        console.log('Corruption strength: '.cyan + corruptionStrength.yellow);

        /* Processing the file. */
        const corruptedFilePath = await corruptFile(file.path, corruptionType, corruptionStrength);

        console.log('Corrupted file path length: '.green + `${corruptedFilePath.length}`.yellow);
        /* Sending the file back */
        res.status(200).download(corruptedFilePath);

        // Delete the file after sending it
        setTimeout(() => {
            console.log('Deleting file: '.red + corruptedFilePath.yellow);
            fs.unlinkSync(corruptedFilePath);
        }, 200);
    } catch (error) {
        console.error('Error while processing request: '.red, error);
        res.status(500).send('Error while processing request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green);
});

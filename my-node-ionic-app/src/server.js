const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/config.json'));
});

app.post('/config', (req, res) => {
    const newConfig = req.body;
    fs.writeFile(path.join(__dirname, '../public/config.json'), JSON.stringify(newConfig, null, 2), (err) => {
        if (err) {
            console.error('Error writing config file:', err);
            res.status(500).send('Error saving config');
        } else {
            res.send('Config updated successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
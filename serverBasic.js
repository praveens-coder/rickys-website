const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Define the path to the 'public' directory
const staticDir = path.join(__dirname, 'public');

// Middleware to serve static files (CSS, JS, images, etc.) from 'public'
app.use(express.static(staticDir));

// Route handlers for different pages
app.get('/', (req, res) => {
    serveHTML('index.html', res);
});

app.get('/about', (req, res) => {
    serveHTML('about.html', res);
});

app.get('/service', (req, res) => {
    serveHTML('service.html', res);
});

app.get('/contact', (req, res) => {
    serveHTML('contact.html', res);
});

// Function to read and serve HTML files
function serveHTML(fileName, res) {
    const currentDate = new Date().toLocaleString();
    const filePath = path.join(staticDir, fileName);

    // Read the requested HTML file and replace '{{currentDate}}' with the current date
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(404).send('404 Not found');
            return;
        }

        const updatedData = data.replace('{{currentDate}}', currentDate);

        res.set('Content-Type', 'text/html');
        res.status(200).send(updatedData);
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});


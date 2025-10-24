const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];          // Store registered users
let applications = [];   // Store applications

// --- Register User ---
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password });
    res.json({ message: 'Registered successfully' });
});

// --- Login User ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', username });
});

// --- Add Application ---
app.post('/applications', (req, res) => {
    const { username, company, jobTitle, dob, appliedDate } = req.body;
    const newApp = { id: applications.length + 1, username, company, jobTitle, dob, appliedDate };
    applications.push(newApp);
    res.json(newApp);
});

// --- Get All Applications for a User ---
app.get('/applications/:username', (req, res) => {
    const userApps = applications.filter(a => a.username === req.params.username);
    res.json(userApps);
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));

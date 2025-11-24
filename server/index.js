const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mock Data
const projects = [
    {
        id: 1,
        title: "Nebula OS",
        description: "A web-based operating system concept with spatial navigation.",
        tech: ["React", "Three.js", "WebGL"],
        image: "https://placehold.co/600x400/000000/FFF"
    },
    {
        id: 2,
        title: "Cyber Finance",
        description: "DeFi dashboard visualization with real-time data streams.",
        tech: ["Vue", "D3.js", "Socket.io"],
        image: "https://placehold.co/600x400/111111/FFF"
    },
    {
        id: 3,
        title: "Void Messenger",
        description: "Encrypted communication platform with ephemeral messages.",
        tech: ["Node.js", "WebRTC", "Redis"],
        image: "https://placehold.co/600x400/222222/FFF"
    },
    {
        id: 4,
        title: "Aero Sim",
        description: "Flight dynamics simulation engine for browser environments.",
        tech: ["Rust", "WASM", "Canvas API"],
        image: "https://placehold.co/600x400/333333/FFF"
    }
];

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

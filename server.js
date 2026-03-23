const express = require("express");
const app = express();

//const PORT = 3000;
const PORT = process.env.PORT || 3000;

// Store last GPS data (simple version)
let gpsData = [];

app.get("/gps", (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;

    if (!lat || !lon) {
        return res.send("ERR");
    }

    const data = {
        lat,
        lon,
        time: new Date()
    };

    gpsData.push(data);

    console.log("Received:", data);

    res.send("OK");
});

// View latest location
app.get("/latest", (req, res) => {
    if (gpsData.length === 0) return res.send("No data");

    res.json(gpsData[gpsData.length - 1]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Server OK");
});

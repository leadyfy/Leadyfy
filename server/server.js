const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Leadyfy CRM Backend Running Successfully!");
});

app.get("/api/dashboard", (req, res) => {
    res.json({
        totalLeads: 150,
        todayLeads: 38,
        followUps: 25,
        approvedLoans: 12
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
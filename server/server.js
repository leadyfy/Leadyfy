const db = require("./database");

console.log("SERVER FILE LOADED");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
    res.send("🚀 Leadyfy CRM Backend Running Successfully!");
});

// Dashboard API
app.get("/api/dashboard", (req, res) => {

    res.json({
        totalLeads: 150,
        todayLeads: 38,
        followUps: 25,
        approvedLoans: 12
    });

});

// =========================
// SAVE LEAD
// =========================

app.post("/api/leads", (req, res) => {

    const {
        customerName,
        mobileNumber,
        loanType,
        loanAmount
    } = req.body;

    db.run(

        `INSERT INTO leads
        (customerName, mobileNumber, loanType, loanAmount)
        VALUES (?, ?, ?, ?)`,

        [
            customerName,
            mobileNumber,
            loanType,
            loanAmount
        ],

        function (err) {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Lead Save Failed"
                });

            }

            res.json({
                success: true,
                message: "Lead Saved Successfully",
                id: this.lastID
            });

        }

    );

});

// =========================
// GET ALL LEADS
// =========================

app.get("/api/leads", (req, res) => {

    db.all(

        "SELECT * FROM leads ORDER BY id DESC",

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json(rows);

        }

    );

});

// =========================
// UPDATE LEAD
// =========================

app.put("/api/leads/:id", (req, res) => {

    const id = req.params.id;

    const {
        customerName,
        mobileNumber,
        loanType,
        loanAmount
    } = req.body;

    db.run(

        `UPDATE leads
         SET customerName = ?,
             mobileNumber = ?,
             loanType = ?,
             loanAmount = ?
         WHERE id = ?`,

        [
            customerName,
            mobileNumber,
            loanType,
            loanAmount,
            id
        ],

        function (err) {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: "Lead Update Failed"

                });

            }

            res.json({

                success: true,
                message: "Lead Updated Successfully"

            });

        }

    );

});

// =========================
// DELETE LEAD
// =========================

app.delete("/api/leads/:id", (req, res) => {

    const id = req.params.id;

    db.run(

        "DELETE FROM leads WHERE id = ?",

        [id],

        function (err) {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: "Delete Failed"

                });

            }

            res.json({

                success: true,
                message: "Lead Deleted Successfully"

            });

        }

    );

});

// =========================

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});
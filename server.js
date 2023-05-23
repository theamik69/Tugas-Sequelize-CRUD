require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const biodata = require("./app/controllers/biodata.controller")

const app = express();

const PORT = process.env.PORT || 3000;

var corsOptions = {
    origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

db.sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db : " + err.message);
});

app.post("/", (req, res) => {
    biodata.create(req, res)
});

app.get("/", (req, res) => {
    biodata.findAll(req, res)
});

app.get("/:id", (req, res) => {
    biodata.findOne(req, res)
});

app.delete("/:id", (req, res) => {
    biodata.delete(req, res)
});

app.patch("/:id", (req, res) => {
    biodata.update(req, res)
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
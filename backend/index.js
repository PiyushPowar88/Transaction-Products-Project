const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/api/test", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
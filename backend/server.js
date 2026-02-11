const express = require("express");
const cors = require("cors");

const app = express();

// MIDDLEWARE (must be added)
app.use(cors());
app.use(express.json());

// TEST API
app.get("/api/test", (req, res) => {
  res.json({ msg: "Backend connected successfully" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});

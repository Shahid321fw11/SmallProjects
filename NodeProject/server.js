const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

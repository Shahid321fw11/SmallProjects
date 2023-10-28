const express = require("express");
const connection = require("./config/ConnectioDB");
const productRouter = require("./routes/product");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT || 8888;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connection();

app.use("/products", productRouter);

app.get("/", async (req, res) => {
  res.send("Server is Running :)");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

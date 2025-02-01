const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const Apirouter=require("./Routes/routes")
app.use(cors());
app.use(express.json());


let playerPoints = 5000; // Initial points

app.use("/api",Apirouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
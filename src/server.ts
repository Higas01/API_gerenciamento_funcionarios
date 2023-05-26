const express = require("express");
const app = express();
const routers = require("./Routes");

app.use(express.json());
app.use(routers);

app.listen(5000, () => {
  console.log("Server Running");
});

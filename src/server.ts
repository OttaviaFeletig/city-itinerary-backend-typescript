import express = require("express");
const app: express.Application = express();
const bodyParser = require("body-parser");
const cityRoute: express.Router = require("./routes/api/city");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("connected!"));
// .catch((err) => console.log(err));
app.use(bodyParser.json());
app.use("/api/cities", cityRoute);

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});

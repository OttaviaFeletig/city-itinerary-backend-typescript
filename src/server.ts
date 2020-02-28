import express = require("express");
const app: express.Application = express();
const bodyParser = require("body-parser");
const eventRoute: express.Router = require("./routes/api/event");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const cors = require("cors");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

const connect = async () => {
  try {
    const res = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

app.use("/api/events", eventRoute);

const listen = async () => {
  var test = await connect();
  if (test !== undefined) {
    console.log("connected");
    app.listen(5000, function() {
      console.log("App listening on port 5000!");
    });
  }
};
listen();

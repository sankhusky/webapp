const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require('./app/config/logger.config');
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models/");
// db.sequelize.sync();
db.sequelize.sync(
  // { force: true }
  ).then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CSYE 6225 project by Sanket Pimple" });
});
require("./app/routes/user.routes")(app);
app.use('/v1/questions?', require('./app/routes/question.routes'));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is deployed and running on port ${PORT}.`);
});

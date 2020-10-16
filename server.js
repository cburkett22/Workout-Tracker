const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connecting the mongo db
try {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbWorkouts",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  );
} catch (err) {
  handleError(err);
}

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
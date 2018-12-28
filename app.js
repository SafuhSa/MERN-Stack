const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/passport")(passport);

// const User = require('./models/User');

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
app.use(passport.initialize());

app.get("/", (req, res) => {
  // const user = new User({
  //   handle: 'jim',
  //   email: "jim@jim.jim",
  //   password: 'jimisgreat123'
  // // })
  // user.save()
  res.send("Hello Safuh")
});

app.use("/api/users", users);
app.use("/api/tweets", tweets);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


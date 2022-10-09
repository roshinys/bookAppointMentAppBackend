const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: false }));
const userRoute = require("./routes/user");
//database
const sequelize = require("./utils/database");
const User = require("./model/user");

// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user/add-user", userRoute);

app.delete("/user/delete-user/:userId", async (req, res) => {
  const userId = req.params.userId;
  //   console.log(userId);
  try {
    if (!userId) {
      throw new Error("no id ");
    }
    const deletedUser = await User.destroy({
      where: {
        id: userId,
      },
    });
    console.log(deletedUser);
    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    res.json({ message: "no such user exists" });
  }
});

sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

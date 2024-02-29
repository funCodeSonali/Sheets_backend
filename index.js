const express = require("express");
const User = require("./models/model");
const app = express();
const connectDB = require("./config/db");
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.put("/api/user", (req, res) => {
  let { key, value } = req.body;
  console.log(value);
  try {
    User.findOne({ key: key }).then(async (user) => {
      if (user) {
        var userid = user._id.toString();
        console.log(userid);
        const updated = await User.findByIdAndUpdate(
          { _id: userid },
          { key: key, value: value }
        );
        console.log(updated);
        return res.status(200).json({
          success: true,
        });
      }

      const new_user = new User({
        key: key,
        value: value,
      });
      new_user
        .save()
        .then((response) => {
          res.status(200).json({
            success: true,
            result: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: [{ error: err }],
          });
        });
    });
  } catch (err) {
    res.status(500).json({
      message: [{ error: err }],
    });
  }
});

app.post("/api/fetch", (req, res) => {
  let { key } = req.body;
  User.findOne({ key: key })
    .then((user) => {
      if (user) {
        let { value } = user;
        res.status(200).json({
          success: true,
          message: user.value,
        });
      }
    })
    .catch((err) => {});
});
app.delete("/api/delete", async (req, res) => {
  const deleted = await User.deleteMany({});
  res.send(deleted);
});
app.listen(4000, console.log("Server started at port 4000"));

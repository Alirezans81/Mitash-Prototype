const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Request = require("./src/models/request");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/mitash-prototype")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err, "could not connect to mongodb"));

app.post("/api/requests", (req, res) => {
  const { name, email, phone, location, description } = req.body;

  if (!name) {
    res.status(400).json({
      data: null,
      message: "نام خود را وارد کنید",
    });
  } else if (!email) {
    res.status(400).json({
      data: null,
      message: "ایمیل خود را صحیح وارد کنید",
    });
  } else if (!phone) {
    res.status(400).json({
      data: null,
      message: "شماره خود را صحیح وارد کنید",
    });
  } else if (!location) {
    res.status(400).json({
      data: null,
      message: "شهر را وارد کنید",
    });
  } else {
    const newRequest = new Request({
      name,
      email,
      phone,
      location,
      description,
    });

    newRequest.save((err, result) => {
      if (err) {
        res.status(500).json({
          data: err,
          message: "متاسفانه مشکلی رخ داده است",
        });
      } else {
        res.status(200).json({
          data: result,
          message: "اطلاعات شما با موفقیت ثبت شد",
        });
      }
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

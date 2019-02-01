if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./utils/db");
const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  path = require("path"),
  htmlContentRouter = require("./routers/htmlContent"),
  productRouter = require("./routers/product"),
  orderRouter = require("./routers/order"),
  userRouter = require("./routers/user"),
  stripeRouter = require("./routers/stripe"),
  emailRouter = require("./routers/email"),
  cartRouter = require("./routers/cart"),
  blogRouter = require("./routers/blog"),
  authRouter = require("./routers/authentication");
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
  })
);
app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb"
  })
);
app.use(cors());
// app.use(express.static(path.join(__dirname + '/clientside/build')));

app.use("/", htmlContentRouter);
app.use("/", productRouter);
app.use("/", orderRouter);
app.use("/", userRouter);
app.use("/", stripeRouter);
app.use("/", emailRouter);
app.use("/", authRouter);
app.use("/", cartRouter);
app.use("/", blogRouter);

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/clientside/build/index.html'));
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("SERVER START: " + PORT);
});

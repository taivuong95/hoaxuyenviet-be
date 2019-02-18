const router = require("express").Router(),
  email = require("nodemailer"),
  util = require("../utils/utilities");

let userModel = require("../models/userModel");

// declare service email
var emailOptions = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW
  }
};

// create Transport
var transporter = email.createTransport(emailOptions);

// connect to email
transporter.verify(function(err, sucess) {
  if (err) {
    console.log(err);
  } else {
    console.log("Kết nối email thành công!");
  }
});

router.post("/sendEmail", function(req, res) {
  var infoMailCustomer = {
    from: "Shop Hoa Xuyên Việt",
    to: req.body.customerInfo.email,
    subject: "Xác nhận đơn hàng",
    html:
      '<h1>Chào <font color="red">' +
      req.body.customerInfo.name +
      '</font>,</h1><br><h3>Bạn đã đặt thành công đơn hàng: <font color="blue">' +
      req.body._id +
      "</font></h3><br><p>Xin hãy chờ chúng tôi xử lý đơn hàng. </p><br><p>Chúc bạn một ngày vui vẻ!</p><p>Shop Hoa Xuyên Việt</p>"
  };

  sendEmail(infoMailCustomer, res);
});

// send email
let sendEmail = (mailInfo, res) => {
  transporter.sendMail(mailInfo, (err, info) => {
    util.execFunction(err, info, res);
  });
};

const generateTokenRS = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

// forgot password
router.post("/forgotPWD", (req, res) => {
  let user = new userModel();
  userModel.findById(
    req.body.userPhone,
    {
      createdAt: 0,
      updatedAt: 0
    },
    async (err, data) => {
      if (err || !data) {
        res.status(403).json(err);
      } else {
        data = data.toJSON();
        const token = generateTokenRS();
        const resetLink = `${req.body.origin}/resetPWD/${data._id}/${token}`;
        data.userPermission.resetLink = await user.generateHash(resetLink);
        userModel.findByIdAndUpdate(req.body.userPhone, data, (err, dt) => {
          if (dt) {
            var infoMailCustomer = {
              from: "Shop Hoa Xuyên Việt",
              to: data.userInfo.email,
              subject: "Đặt Lại Mật Khẩu",
              html:
                '<h1>Chào <font color="red">' +
                data.userInfo.name +
                '</font>,</h1><br><h3>Đây là link reset Mật Khẩu: <font color="blue">' +
                resetLink +
                "</font></h3><br><p></p><br><p>Chúc bạn một ngày vui vẻ!</p><p>Shop Hoa Xuyên Việt</p>"
            };
            sendEmail(infoMailCustomer, res);
          } else {
            util.errFunction(
              res,
              403,
              "Lỗi Xảy Ra! Vui Lòng Thao Tác Lại!",
              "011"
            );
          }
        });
      }
    }
  );
});

module.exports = router;

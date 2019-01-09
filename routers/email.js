const router = require('express').Router,
  email = require('nodemailer'),
  util = require('../utils/utilities');

// declare service email
var emailOptions = {
  service: 'gmail',
  host: 'smtp.gmail.com',
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
transporter.verify(function (err, sucess) {
  if (err) {
    console.log(err);
  } else {
    console.log('Kết nối email thành công!');
  }
});


router.post('/sendEmail', function (req, res) {
  var infoMailCustomer = {
    from: 'Đồ cũ Cao Cường <docucaocuong.it@gmail.com>',
    to: 'nqthai95@gmail.com',
    subject: 'Xác nhận đơn hàng',
    html: '<h1>Chào <font color="red">' + 'Thai' + '</font>,</h1><br><h3>Bạn đã đặt thành công đơn hàng: <font color="blue">' + '001' + '</font></h3><br><p>Xin hãy chờ chúng tôi xử lý đơn hàng. </p><br><p>Chúc bạn một ngày vui vẻ!</p><p>Cửa hàng đồ cũ Cao Cường,</p>'
  };

  sendMail(infoMailCustomer, res);

});

// send email
sendEmail = (mailInfo, res) => {
  transporter.sendMail(mailInfo, (err, info) => {
    util.execFunction(err, info, res)
  })
}

module.exports = router;
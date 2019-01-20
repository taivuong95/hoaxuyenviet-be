const execFunction = (err, data, res, errCode = 404) => {
  if (err) {
    res.status(errCode).json(err);
  } else {
    res.json(data);
  }
};

const errFunction = (res, statusCode, errMess, code) => {
  res.status(statusCode).json({
    message: errMess,
    code
  })
}

module.exports = {
  execFunction,
  errFunction
}
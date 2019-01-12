const execFunction = (err, data, res, errCode = 404) => {
  if (err) {
    res.status(errCode).json(err);
  } else {
    res.json(data);
  }
};

module.exports = {
  execFunction
}
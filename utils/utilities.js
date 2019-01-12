const execFunction = (err, errCode = data, res) => {
  if (err) {
    res.status(errCode).json(err);
  } else {
    res.json(data);
  }
};

module.exports = {
  execFunction: execFunction
};

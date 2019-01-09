const execFunction = (err, data, res, errNo = 404) => {
  if (err) {
    res.status(errNo).json(err);
  } else {
    res.json(data);
  }
}

module.exports = {
  execFunction
}
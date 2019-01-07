const execFunction = (err, errNo, data, res) => {
  if (err) {
    res.status(errNo).json(err);
  } else {
    res.json(data);
  }
}

module.exports = {
  execFunction: execFunction
}
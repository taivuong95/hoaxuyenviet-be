const execFunction = (err, data, res) => {
  if (err) {
    res.json(404, err);
  } else {
    res.json(data);
  }
}

module.exports = {
  execFunction: execFunction
}
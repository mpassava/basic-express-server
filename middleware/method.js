const method = (req, res, next) => {
  console.log(req.method);
  next();
};

module.exports = method;

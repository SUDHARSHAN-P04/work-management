function ensureAuthenticated(req, res, next) {
  if (!req.session.user) {
    req.session.errorMessage = "Please log in to continue.";
    return res.redirect("/login");
  }
  next();
}

function ensureAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== "admin") {
    req.session.errorMessage = "Admin access is required.";
    return res.redirect("/login/admin");
  }
  next();
}

function ensureWorker(req, res, next) {
  if (!req.session.user || req.session.user.role !== "worker") {
    req.session.errorMessage = "Worker access is required.";
    return res.redirect("/login");
  }
  next();
}

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  ensureWorker
};

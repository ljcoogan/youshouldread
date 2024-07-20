export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("http://localhost:5173");
  }
}

export function ensureGuest(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("http://localhost:5173");
  } else {
    next();
  }
}

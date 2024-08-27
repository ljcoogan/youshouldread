import getUser from "../utils/getUser.js";

export async function getNames(req, res, next) {
  if (req.session && req.session.passport) {
    try {
      const user = await getUser(req);
      res.json({
        displayName: user.displayName,
        username: user.username,
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).end();
  }
}

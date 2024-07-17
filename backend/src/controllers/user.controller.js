import getUser from '../utils/getUser.js'

export async function getDisplayName(req, res, next) {
  if (req.session && req.session.passport) {
    try {
      const user = await getUser(req)
      res.send(user.displayName)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(401).end()
  }
}

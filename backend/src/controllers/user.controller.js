import Session from '../models/session.model.js'
import User from '../models/user.model.js'

export async function getDisplayName(req, res, next) {
  if (req.session && req.session.passport) {
    try {
      const sessionDoc = await Session.findById(req.session.id)
      const session = JSON.parse(sessionDoc.session)
      const userId = session.passport.user
      const user = await User.findById(userId)
      res.send(user.displayName)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(401).end()
  }
}

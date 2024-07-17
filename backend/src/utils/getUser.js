import Session from '../models/session.model.js'
import User from '../models/user.model.js'

export default async function getUser(req) {
  const sessionDoc = await Session.findById(req.session.id)
  const session = JSON.parse(sessionDoc.session)
  const userId = session.passport.user
  return await User.findById(userId)
}

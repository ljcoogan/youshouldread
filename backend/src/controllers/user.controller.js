import Session from '../models/session.model.js'
import User from '../models/user.model.js'

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

export async function getBooks(req, res, next) {
  if (req.session && req.session.passport) {
    try {
      const user = await getUser(req)
      console.log('USER', user)
      res.send(user.books)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(401).end()
  }
}

async function getUser(req) {
  const sessionDoc = await Session.findById(req.session.id)
  const session = JSON.parse(sessionDoc.session)
  const userId = session.passport.user
  return await User.findById(userId)
}
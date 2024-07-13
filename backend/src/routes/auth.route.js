import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173',
    successRedirect: 'http://localhost:5173'
  })
)

router.get('/google/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) next(err)
    else res.redirect('http://localhost:5173')
  })
})

export default router

import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/user.model.js'

export default function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleId: profile.id })
      if(user) {
        done(null, user)
      } else {
        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName
        })
        
        const savedUser = await newUser.save()
        done(null, savedUser)
      }
    } catch (err) {
      console.error(err)
    }
  }))

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
  })
}
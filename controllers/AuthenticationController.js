
import jwt from 'jsonwebtoken'

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, 'secret', {expiresIn: ONE_WEEK})
}

export default {
  logIn: function (req, res) {
    // console.log(req.body)
    const user = {email: req.body.email, password: req.body.password}
    res.send({
      user: user,
      token: jwtSignUser(user)
    })
  }
}

import { Strategy } from 'passport-local';
import User, { generateHash, validPassword } from '../model/user';
import passport from 'passport';
import model from '../model/user';

export function configPassport() {
  passport.serializeUser((user: {id: any}, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, usr) => {
      done(err, usr === null ? undefined: usr);
    });
  });

  passport.use('local-signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email: string, password: string, done) => {
    process.nextTick(() => {
      User.findOne({'local.email': email}, (err, user) => {
        if (err) {
          return;
        }
        if (user) {
          return done(null, false, req.flash('signupMessage', '用户已注册'));
        } else {
          const newUser = new User();
          newUser.set('local.email', email);
          newUser.set('local.password', generateHash(password));
          newUser.save((err, res) => {
            if (err) {
              throw err;
            }
            return done(null, res);
          });
        }
      })
    });
  }));

  passport.use('local-login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', '用户不存在'));
      }
      if (!validPassword(password, user)) {
        return done(null, false, req.flash('loginMessage', '密码错误'));
      }
      return done(null, user);
    })
  }))

}
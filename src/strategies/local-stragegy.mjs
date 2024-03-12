import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";
 
passport.serializeUser((user, done) => {
    console.log(`inside serializeUser`)
    console.log(`${user}`)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`inside deserializeUser`)
    console.log(`ID is :${id}`)
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, passport, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${passport}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User Not Found");
      if (findUser.password !== passport)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

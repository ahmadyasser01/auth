import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import  GitHubStrategy from "passport-github2";
import dotenv from "dotenv";
dotenv.config()

const  passportSetup =  passport.use(new Strategy({
        clientID:  process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) =>{
    
        return done(null,profile);
      }
    ));
    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope:['user:email'],
    },
    async (accessToken, refreshToken, profile, done) =>{
    
      return done(null,profile);
    }
    
    
  ));
     
export default passportSetup
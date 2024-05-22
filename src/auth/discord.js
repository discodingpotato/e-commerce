const passport = require('passport');
const oauthLogins = require('../models/oauthLogins');

const DiscordStrategy = require('passport-discord').Strategy;

let scopes = ['identify', 'email'];

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'http://localhost:7000/auth/discord/callback',
    scope: scopes
},
    async function (accessToken, refreshToken, profile, cb) {

        // console.log(profile);
        let userDetails = await oauthLogins.findOneAndUpdate({ strategyId: profile.id }, {
            displayName: profile.global_name,
            email: profile.email,
            profile: `https://cdn.discordapp.com/avatars/${profile.id}/` + profile.avatar + '.png',
            provider: profile.provider
        }, { new: true, upsert: true });
        cb(null, userDetails)
        // User.findOrCreate({ discordId: profile.id }, function(err, user) {
        //     return cb(err, user);
        // });
    }));

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (userId, done) => {
    const userDetails = await oauthLogins.findById(userId)
    done(null, userDetails);
})

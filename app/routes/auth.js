module.exports = function(app, express, passport){
    var router = express.Router();

    router.get('/spotify', passport.authenticate('spotify'), 
    function(req, res) {
        // The request will be redirected to spotify for authentication, so this
        // function will not be called.
    });
    
    router.get('/spotify/callback',
                passport.authenticate('spotify', 
                { failureRedirect: '/login' }),

                function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/profile');
                }
    );
 app.use('/auth', router);
}
 
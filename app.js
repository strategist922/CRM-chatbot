var restify = require('restify');
const bot = require('./bot.js');

// Setup Restify Server
var server = restify.createServer();
server.use(require('restify-plugins').queryParser());
server.listen(process.env.port || process.env.PORT || 80, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Listen for messages from users 
server.post('/api/messages', bot.connector('*').listen());

//OAuth Google+ login
server.get('/oauthcallback', (req, res, next) => {
    var adress = JSON.parse(req.query.state).adress
    var dialog = JSON.parse(req.query.state).dialog_name

    var oauth2Client = require('./Utils/GoogleOAuth.js').oauth2Client
    oauth2Client.getToken(req.query.code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            oauth2Client.setCredentials(tokens);
            require('./Utils/GoogleOAuth.js').getPlus(oauth2Client, bot, adress, dialog)
        }
        res.send(200, 'Hvala na prijavi!');
    });
})
var express = require('express'),
    app = express();
    //twilio = require('twilio'),
    //client = twilio('AC0604352e28ad6fbec6000b769b128c2e', 'f8f9be8f5cf6345172f4bb8d24f03328'),
    //cronJob = require('cron').CronJob;

//var textJob = new cronJob( '*/1 * * * *', function(){
//    client.sendMessage( { to:'8502641440', from:'8505838410', body:'We cronin on ionic!' }, function( err, data ) {
//        console.log('cronjob err', err);
//        console.log('cronjob data', data)
//    });
//    },  null, true);

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/create', function(req, res, next) {
    console.log('starting cronjob in routes');
    textJob.start();
    res.sendStatus(200);
});

app.get('/end', function(req, res, next) {
    console.log('ending cronjob in routes.');
    textJob.stop();
    res.sendStatus(200);
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

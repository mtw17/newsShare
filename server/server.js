var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

if (require.main === module) {
  //app.start();
  app.io = require('socket.io')(app.start());
  app.io.on('connection', function(socket){
    console.log('a user connected');
    //app.io.emit('article added');
    socket.on('article added', function(art){
        console.log('article: ' + art);
        app.io.emit('article saved');
	//add verification here
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
  });

}

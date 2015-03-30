
var PORT = process.env.PORT || 3000;

//  -- requirements --
var koa = require('koa');
var app = koa();
var common = require('koa-common');
var session = require('koa-session-redis');
var jade = require('koa-jade');
var body = require('koa-body');
var moment = require('moment');
var stylus = require('stylus');
var nib = require('nib');
var flash = require('koa-flash');
var fs = require('fs');

moment.locale('it');

//  -- routing --
var RR = require('koa-rr');
var routes = require('./config/routes');
var rr = new RR(app);


//  -- authorization --
var CanLib = require('can.js');
var permissions = require('./config/authorizations');
var can = new CanLib(permissions);

//  -- build our style --
stylus(fs.readFileSync('./assets/css/style.styl', 'utf8'))
  .include(nib.path)
  .set('compress', true)
  .render(function(err, css) {
      if (err) { console.log(err); return; }
      fs.writeFile('./assets/css/style.css', css, function (err_) {
        if (err_) { console.log(err_); return; }
      });
  });

app.proxy = (process.env.NODE_ENV === 'production');
app.keys = ['kjhgvhfgcgfdxhtrr67809uhjvfrsdt43qdfgjhk'];

var COOKIE_OPTS = {};
if (process.env.NODE_ENV === 'production') {
  COOKIE_OPTS = {
    domain: 'utilia.tools',
    secureProxy: true,
    signed: true,
  };
}

//  -- common middleware --
app.use(function* _security(next) {
  this.set('X-XSS-Protection', '1; mode=block');
  this.set('X-Frame-Options', 'DENY');
  yield next;
});
app.use(common.favicon());
app.use(common.etag());

//  -- serving static assets --
app.use(common.static(__dirname + '/assets', { maxage: 0 }));

//  -- dynamic stuff --
app.use(common.logger());
app.use(session({ store: { ttl: 3600, host: process.env.KOA_SESSION_REDIS_ADDRESS, port: process.env.KOA_SESSION_REDIS_PORT }, cookie: COOKIE_OPTS }));
app.use(flash());
app.use(body({ multipart: false }));
app.use(function* _contextify(next) {
  this.can = can;
  this.reverse = rr.reverse.bind(rr);
  this.user = this.session.user;
  yield next;
});

//app.use(require('./controllers/admin/login').validateSessionMiddleware);

//  -- templating --
app.use(jade.middleware({
  viewPath: __dirname + '/views',
  basedir: __dirname + '/views',
  noCache: (process.env.NODE_ENV !== 'production'),
  debug: (process.env.NODE_ENV !== 'production'),
  pretty: (process.env.NODE_ENV !== 'production'),
  compileDebug: (process.env.NODE_ENV !== 'production'),
  locals: {
    BASE_URL: process.env.BASE_URL,
    LINK_BASE_URL: process.env.LINK_BASE_URL,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    reverse: rr.reverse.bind(rr),
    moment: moment
  }
}));


app.use(function* catchErrors(next) {
  try {
    yield next;
    
  } catch (e) {
    if (e.message.match(/is not authorized/)) {
      this.redirect(this.reverse('admin-login'));
      
    } else {
      this.status = 500;
      yield this.render('error', {
        errorinfo: {
          type: 500,
          streamName: '' + Date.now(),
          timestamp: Date.now(),
          debug: (process.env.NODE_ENV !== 'production') ? e.stack : false,
        }
      });
    }
  }
});


//  -- routing --
rr.configure(routes);


//  -- bang! --
app.listen(PORT, function () {
  console.log('Server started on port', PORT);
});

const express       = require("express"),
      config        = require("./config/config"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      methodOverride= require("method-override"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      Users          = require("./models/user"),
      cookieParser  = require("cookie-parser"),
      cors          = require('cors'),
      errorHandler  = require('errorhandler'),
      path = require('path'),
      userToken = require('./global/global'),
      app           = express();


app.use(cors());
app.use(require('morgan')('dev'));
const isProduction = process.env.NODE_ENV === 'production';
if(!isProduction) {
  app.use(errorHandler());
}
mongoose.Promise = global.Promise;
mongoose.connect(config.db.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
  console.log("Connected to DB");   
}).catch( err => {
    console.log(err.message);
});
mongoose.set('debug', true);


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser('secret'));
app.use(bodyParser.json()); 
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));

app.use(require("express-session")({
    secret: "Love of my life",
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    emailField: 'user[email]',
    passwordField: 'user[password]',
    }, (username, password, done) => {
    Users.findOne({ username })
        .then((user) => {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'username or password': 'is invalid' } });
        }

        return done(null, user);
        }).catch(done);
    }));


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

console.log(userToken);

app.use(require('./routes'));

app.listen(config.app.port);
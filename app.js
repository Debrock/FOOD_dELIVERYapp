require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
// const dotenv=require('dotenv')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

// "mongodb+srv://dbFoodapp:<Foodapp>@projectdbs.ya4kr.mongodb.net/<userDB>?retryWrites=true&w=majority"
// "mongodb://localhost:27017/userDB"
mongoose.connect("mongodb+srv://dbFoodapp:Foodapp@projectdbs.ya4kr.mongodb.net/userDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
mongoose.set("useCreateIndex", true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const menuSchema = new mongoose.Schema ({
  Id: String,
  OrderNo: String,
  Dish: String,
  Price: String,
  Type: String,
  Img: String
});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  secret: String
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

var Menu = new mongoose.model("Menu", menuSchema);
var User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/food",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/",function(req,res){
  res.render("index");
});


app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/food",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/food");
  });

app.get("/food",function(req,res){
  // let Menucard= [{'Dish': 'Cake','Price':'100'},{'Dish':'Burger','Price':'50'}]
  // const db = client.db('userDB');
  // const collection = db.collection('menu');
  // Find some documents

  Menu.find(function(err, Menucard){
    if(err){
    console.log(err);
    }
    else{
      res.render("food", {'menu': Menucard});
    }
  });
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/tracker",function(req,res){
  res.render("tracker");
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res){

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/food");
      });
    }
  });

});
app.post("/login", function(req, res){

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/food");
      });
    }
  });

});

app.listen(3000,function(){
  console.log("Server on Port 3000 running")
});

const dbURL="mongodb+srv://soscitysafty:sos123@cluster0.gehvy.mongodb.net/CitySaftyDB?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const Search = require('./models/search');

mongoose.connect(dbURL)
.then((result)=>console.log("connected to db"))
.catch((err)=>console.log("connected to db"));


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter=require("./routes/testAPI");








var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI",testAPIRouter);
//app.use("/hotels",hotelsAPIRouter);
//app.use("/attractions",attractionsAPIRouter);
//app.use("/restaurants",restaurantsAPIRouter);









/////////////////////





app.use('/hotels',(req,res)=>{
  
  const blog = new Search({
    type: 'hotels',

  });
  blog.save()
  .then((result)=>{
    res.send(result)

  })
  .catch((err)=>{
console.log(err)
});
});



app.use('/attractions',(req,res)=>{
  
  const blog = new Search({
    type: 'attractions',

  });
  blog.save()
  .then((result)=>{
    res.send(result)

  })
  .catch((err)=>{
console.log(err)
});
});

app.use('/restaurants',(req,res)=>{
  
  const blog = new Search({
    type: 'restaurants',

  });
  blog.save()
  .then((result)=>{
    res.send(result)

  })
  .catch((err)=>{
console.log(err)
});
});



app.get('/all-searchs',(req,res)=>{
  Search.find()
  .then((result)=>{
    //res.send(result);

    var myResult="";
    for(var r in result){
      myResult+="<h1>";
      console.log(result[r]['type']);
      myResult+=result[r]['type'];
      myResult+="</h1>";
      myResult+=" ";
      myResult+=result[r]['createdAt'];
      myResult+="<br>";
      


    }
    res.send(myResult);
  })
  .catch((err)=>{
    console.log(err);
  })
});



///////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

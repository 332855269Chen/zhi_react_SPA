var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let multer = require('multer')
let cookieSession = require('cookie-session');
let body = require("body-parser"); 
var cors = require('cors'); //引入后端cors跨域

var app = express();//web服务器

// 中间件配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//静态资源托管
// app.use(express.static(path.join(__dirname, 'public','template')));
app.use(express.static(path.join(__dirname, 'public','build')));
// app.use('/admin',express.static(path.join(__dirname, 'public','build')));
// app.use(express.static(path.join(__dirname, 'public','project2-store')));
app.use(express.static(path.join(__dirname, 'public')));

//改上传的文件格式
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('user')!==-1 || req.url.indexOf('reg')!==-1){
      cb(null, path.join(__dirname, 'public','upload','user'))
    }else if(req.url.indexOf('banner')!==-1){
      cb(null, path.join(__dirname, 'public','upload','banner'))
    }else{
      cb(null, path.join(__dirname, 'public/upload/product'))
    }
  }
})
let multerObj = multer({storage});
// let multerObj = multer({dest:'字符路径'}); //存储方式dest指定死了，storage分目录

app.use(multerObj.any())


let arr=[];
for(var i=0;i<1000;i++){
  arr.push('alex_'+Math.random())
}
app.use(cookieSession({
  name:'alex_id',
  keys:['aa','bb','cc'],
  maxAge:1000*60*60*24*15
}))

app.use(cors({
  "origin":["http://localhost:8001","http://localhost:5000","http://localhost:8080","http://localhost:3000","http://localhost:3001"],  //允许所有前端域名
  "credentials":true,//允许携带跨源凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders":['Content-Type','Authorization']//被允许的post方式的请求头
}));//安装 cors跨域





//响应

//管理端
// app.use('/admin/apiname',路由)


//用户端
// app.use('/api/apiname',路由)
app.all('/api/*',require('./routes/api/params'))
app.use('/admin/banner',require('./routes/admin/banner'))
app.use('/api/home',require('./routes/api/home'))
app.use('/api/follow',require('./routes/api/follow'))
app.use('/api/column',require('./routes/api/column'))
app.use('/api/login',require('./routes/api/login'))
app.use('/api/login2',require('./routes/api/login2'))
app.use('/api/reg',require('./routes/api/reg'))
app.use('/api/logout',require('./routes/api/logout'))
app.use('/api/user',require('./routes/api/user'))
//增删改
app.use('/api/add',require('./routes/api/add'))
app.use('/api/ashan',require('./routes/api/ashan'))

//代理端
// app.use('/proxy/apiname',路由) 
app.use('/proxy/douban',require('./routes/proxy/douban'))

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
  // res.render('error');
  res.send({err:1,msg:'错误的接口或请求方式'});
});

module.exports = app;

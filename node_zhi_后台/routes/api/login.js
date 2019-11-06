var express = require('express');
var router = express.Router();
var mgdb = require('../../utils/mgdb')
var bcrypt = require('bcrypt')

router.post('/', function (req, res, next) {

     res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);    //后端解决 跨域问题的语句   这是逐级，还有一个cos中间件是全局
  
  let { username, password, save } = req.body
  console.log('loginReq',req.body)
  //username password 必传参数
  if (!username || !password) {
    res.send({ err: 1, msg: '用户名和密码为必传参数' })
    return;
  }

  //兜库
  mgdb({
    collectionName: 'user',
    success: ({ collection, client, ObjectID }) => {
      collection.find({
        username
      }, {

        }).toArray((err, result) => { 
          if (err) {
            res.send({ err: 1, msg: 'user集合操作错误' })
          } else {
            // console.log(result)
            if (result.length > 0) {
              // result[0].password == 加了盐的密码
              let pass = bcrypt.compareSync(password,result[0].password);
              console.log(password,result[0].password)
              // console.log(pass)

              if (pass) {     
                if (save) {
                  //种cookie
                  req.session['1907_session'] = result[0]._id
                }
                // delete result[0].username
                delete result[0].password
                res.send({ err: 0, msg: '登陆成功', data: result[0] })
              } else {
                res.send({ err: 1, msg: '密码有误'})
              }
            } else {
              res.send({ err: 1, msg: '用户名有误' })
            }
          }
          client.close();
        })
    }
  })

});

module.exports = router;


var express = require('express');
var router = express.Router();
var pathLib = require('path');
var mgdb = require('../../utilsdb');
var fs = require('fs');

router.post('/', function(req, res, next) {
  //抓取用户信息(name,pass,icon,nikename)
  // console.log(req.body);
  let username = req.session['username']
  let {buycar} =req.body || [];
  //校验必传参数
  
  mgdb({
    collectionName: 'usercart',
    dbName:'vueobj',
    success:({collection,client})=>{
      collection.find({username},{}).toArray((err,result)=>{
        if(!err && result.length>0){
            collection.updateOne({"username":username},{$set:{"buycar":buycar}},
            (err,result)=>{
              if(!err){
                res.send({err:0,msg:'插入成功',data:"ok"});
              }else{
                //   console.log(err)
                res.send({err:1,msg:'buycar集合操作失败'})
                client.close()
              }
            })
        }else{
            collection.insertOne({
                username,buycar
              },(err,result)=>{
                if(!err){
                //   res.send({err:0,msg:'注册成功',data:result.ops[0]})
                }else{
                  res.send({err:1,msg:'user集合操作失败'})
                  client.close()
                }
              })
        }
      })
    }
  })

});

module.exports = router;


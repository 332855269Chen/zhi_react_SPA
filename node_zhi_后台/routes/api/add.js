var express = require('express');
var router = express.Router();
var mgdb = require('../../utils/mgdb')

router.get('/', function (req, res, next){

    let {num,_id,userID} = req.query;
    console.log(req.query)
    
    // mgdb.open(function(err,db){
    //         if(!err)
    //         {   
    //            db.collection('mycoll',{safe:true},function(err,collection){
    //                var tmp1 = {title:'hello',number:1};
    //                collection.insert(tmp1,{safe:true},function(err,result){
    //                   console.log(result);
    //              }); 
    //    　　　　});
    //         }else{
    //             console.log(err);
    //         }   
        
    //     });
                
           


         // 增
    mgdb({
            collectionName:"news",
            success: ({ collection, client }) => {
                var tmp1 = {goodsid:_id,number:num,collect:true};
                collection.insert(tmp1,{safe:true},function(err,result){
                   res.send(result);
                //    console.log(result)
               })
               client.close()
        }       
    })
            // 更新
    // mgdb({
    //         collectionName:"news",
    //         success: ({ collection, client }) => {
    //             var tmp1 = {userDetail:{goodsid:_id,number:num}};
    //                                     还需要改
    //             collection.update({title:'hello'},{$set:{number:3}},{safe:true},function(err,result){
    //                 console.log(result);
    //                  });

    //            client.close()
    //     }
        
    // })
         
        



})

    

module.exports = router;

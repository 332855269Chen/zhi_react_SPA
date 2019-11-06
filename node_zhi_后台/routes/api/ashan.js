var express = require('express');
var router = express.Router();
var mgdb = require('../../utils/mgdb')

router.get('/', function (req, res, next){

    //删     
    // mgdb(function(err,db){
    //         if(!err)
    //          {
    //            db.collection('news',{safe:true},
    //            function(err,collection){
    //                collection.remove(
    //                    {title:'hello'},{safe:true},
    //             //    function(err,result){console.log(result); }
    //                      ); 
    //             }
                
    //          )}
    //      else{
    //             console.log(err);
    //         }         
                                        
    //     })
    let {num,_id } = req.query;

        // 删 是删整条数据，
          mgdb({
            collectionName:"news",
            success: ({ collection, client }) => {
                var tmp1 = {goodsid:_id};
               collection.remove(
                  tmp1,{safe:true},
                  function(err,result){res.send(result);}
                ) 
               client.close()
            }    
         })
      

    //         //更新
    //     let {num,_id,UserID } = req.query;
    //    mgdb({
    //         collectionName:"news",
    //         success: ({ collection, client }) => {
    //             var tmp1 = {userDetail:{goodsid:_id,number:num}};
    //             collection.update(
    //             // {title:"hello"},{$set:{number:3}},
    //              {userDetail :{goodsid:_id,number:""}, userID : userID },
    //              {$set:{userDetail:{goodsid:_id,number:num}}},
    //             {safe:true},function(err,result){res.send(result);console.log(result) }
    //             );
    //            client.close()
    //         }    
    //      });

    

 })
    

module.exports = router;

var express=require("express");
var router=express.Router();

router.get("/",function(req,res,next){
    res.send("api working proptly");
    console.log("test");
});
module.exports=router;
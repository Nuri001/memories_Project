const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const searchSchema=new Schema(
   {
    type:{
        type: String,
        require: true
    },
   },
   {
    timestamps:true
    
   }
   
);

const Search=mongoose.model('Search',searchSchema);
module.exports=Search
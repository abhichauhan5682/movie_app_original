const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String
    },
    name:{
        type:String
    }
},{timestamp:true}) ;


module.exports=Post=mongoose.model('post',PostSchema);
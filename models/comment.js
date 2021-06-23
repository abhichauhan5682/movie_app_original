const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    postId:{
        type:String
    },
    responseTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String
    },
    discuss:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},{timestamp:true}) ;


module.exports=Comment=mongoose.model('comment',CommentSchema);
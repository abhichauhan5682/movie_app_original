const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'user'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'comment'
   },
   movieId: {
       type: String,
   },
   postId:{
        type:Schema.Types.ObjectId,
        ref:'post'
    }

}, { timestamps: true })


module.exports= Dislike = mongoose.model('dislike', dislikeSchema);

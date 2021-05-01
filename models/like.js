const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
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
   }

}, { timestamps: true })


module.exports= Like = mongoose.model('like', likeSchema);

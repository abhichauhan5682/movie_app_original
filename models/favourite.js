const mongoose=require('mongoose');

const FavouriteSchema=new mongoose.Schema({
    userFrom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    movieId:{
        type:String
    },
    movieTitle:{
        type:String
    },
    movieImage:{
        type:String
    },
    movieRunTime:{
        type:String
    }

});


module.exports=Favourite=mongoose.model('favourite',FavouriteSchema);
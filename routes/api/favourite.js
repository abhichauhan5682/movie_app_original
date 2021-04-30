const express= require('express');
const router=express.Router();
const config=require('config');
const Favourite=require('../../models/favourite');
const auth=require('../../middleware/auth');


// @route POST /api/favourite/favouriteNumber
// @desc mark as favourite 
// @access Private
router.post('/favouriteNumber',auth,(req,res)=>{
    //
    Favourite.find({"movieId":req.body.movieId})
    .exec((err,favourite)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,favouriteNumber:favourite.length});
    })
});


router.post('/favourited',auth,(req,res)=>{
    // console.log(req.body);
    Favourite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err,fav)=>{
        if(err) return res.status(400).send(err);
        let result=false;
        if(fav.length!==0){
            result=true;
        }
        return res.status(200).json({success:true,favourited:result});
    })
});


router.post('/addToFavourite',auth,(req,res)=>{
    // console.log(req.body)

    const favorite = new Favourite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post('/removeFromFavourite', auth,(req, res) => {

    // console.log(req.body);
    Favourite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});


router.post("/getFavouredMovie", (req, res) => {

    //Need to find all of the Users that I am subscribing to From Subscriber Collection 
    Favourite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
});

module.exports=router;
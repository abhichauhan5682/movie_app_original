const express=require('express');
const auth=require('../../middleware/auth');
const Like=require('../../models/like');
const Dislike=require('../../models/dislike');
const router=express.Router();

router.post('/getlikes',(req,res)=>{
    let variable={};
    if(req.body.movieId){
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }else{
        variable={postId:req.body.postId,userId:req.body.userId}
    }
    Like.find(variable)
    .exec((err,likes)=>{
        if(err) return res.status(400).json({success:false,err});
        return res.status(200).json({success:true,likes});
    })
});

router.post('/getdislikes',(req,res)=>{
    let variable={};
    if(req.body.movieId){
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }else{
        variable={postId:req.body.postId,userId:req.body.userId}
    }
    Dislike.find(variable)
    .exec((err,dislikes)=>{
        if(err) return res.status(400).json({success:false,err});
        return res.status(200).json({success:true,dislikes});
    })
});

router.post('/uplike',auth,(req,res)=>{
    let variable={};
    if(req.body.movieId){
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }else{
        variable={postId:req.body.postId,userId:req.body.userId}
    }
    const like=new Like(variable);
    like.save((err,result)=>{
        if(err) return res.json({suceess:false,err});
        Dislike.findOneAndDelete(variable)
        .exec((err,disresult)=>{
            if(err) return res.status(400).json({success:false,err});
            return res.status(200).json({success:true});
        })
    })

});

router.post("/unlike",auth, (req, res) => {

    let variable = {}
    if(req.body.movieId){
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }else{
        variable={postId:req.body.postId,userId:req.body.userId}
    }
    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

});


router.post("/undislike",auth, (req, res) => {

    let variable = {}
    if(req.body.movieId){
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }else{
        variable={postId:req.body.postId,userId:req.body.userId}
    }
    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})

router.post('/updislike',auth,(req,res)=>{
    let variable={};
    if(req.body.movieId){
        variable = { movieId: req.body.movieId, userId: req.body.userId }
    } else if(req.body.commentId) {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }else{
        variable={postId:req.body.postId,userId:req.body.userId}
    }
    const dislike=new Dislike(variable);
    dislike.save((err,result)=>{
        if(err) return res.json({suceess:false,err});
        Like.findOneAndDelete(variable)
        .exec((err,disresult)=>{
            if(err) return res.status(400).json({success:false,err});
            return res.status(200).json({success:true});
        })
    })

});


module.exports=router;
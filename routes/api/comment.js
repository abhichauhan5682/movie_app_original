const express=require('express');
const { check , validationResult}=require('express-validator/check');

const Comment=require('../../models/comment');
const auth=require('../../middleware/auth');

const router=express.Router();


router.post('/saveComment',auth,(req,res)=>{
    const comment = new Comment(req.body)
    
    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
});

router.post('/getComments',(req,res)=>{
    //console.log(req.body);
    var variable={};
    if(req.body.movieId) variable={'postId':req.body.movieId}
    else variable={'discuss':req.body.postId}
    Comment.find(variable)
    .populate('writer')
    .exec((err,comments)=>{
        if(err) return res.status(400).send(err);
        //console.log(comments);
        return res.status(200).json({success:true,comments});
    })
});

module.exports=router;
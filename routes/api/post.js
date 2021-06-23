const express= require('express');
const {check,validationResult}=require('express-validator/check');

const Post=require('../../models/post')
const auth=require('../../middleware/auth');
const User=require('../../models/user');

const router=express.Router();
router.post('/setpost',[auth,[
    check('text','text is requires').not().isEmpty(),
]],async (req,res)=> {
    const err=validationResult(req);
    if(!err.isEmpty()) return res.status(400).json({errors:err.array()});
    const user=await User.findById(req.user.id).select('-password');
    const newPost={
        content:req.body.text,
        name:user.name,
        user:req.user.id
    }
    const post=new Post(newPost);
    post.save((err,post)=>{
        if(err) return res.status(400).json({success: false, err})
        Post.find({ '_id': post._id })
            .populate('user')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
});

router.get('/getposts',async (req,res)=>{
    try {
        const post =await Post.find().sort();
        return res.json({success:true,post});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"SERVER ERROR"}); 
    }
});

router.get('/:id',auth,async (req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:'not found'});
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"SERVER ERROR"}); 
    }
});

router.delete('/:id',auth,async (req,res)=>{
    try {
        const post =await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg:'post not found'});

        if(post.user.toString() !=req.user.id) return res.json.status(401).json({msg:"user not found"});
        await post.remove();
        res.json({msg:"deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"SERVER ERROR"}); 
    }
});












module.exports=router;
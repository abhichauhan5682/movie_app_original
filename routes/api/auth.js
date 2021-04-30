const express=require('express');
const { check , validationResult}=require('express-validator/check');
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');

const User=require('../../models/user');
const auth=require('../../middleware/auth');

const router=express.Router();

// @route GET api/auth
// @desc login
// @access PRIVATE
router.get('/',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
});

// @route POST api/auth
// @desc  LOGIN
// @access Public
router.post('/',[
    check('email',"Email is required").isEmail(),
    check('password','password is required').exists()
],async (req,res)=> {
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors:err.array()});
    } 
    const {email, password}=req.body;
    try {
        // see if user exists
        let user =await User.findOne({email:email});
        if(!user){
            return res.status(400).json({errors:[{msg:'invalid creditionals'}]});
        }
        //return json web token 
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({errors:[{msg:'invalid creditionals'}]});

        const payload={
            user:{
                id:user.id
            }
        }
        
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        );
       
    } catch (error) {
       console.log(error);
       res.status(500).send("server error"); 
    }
});





module.exports=router;
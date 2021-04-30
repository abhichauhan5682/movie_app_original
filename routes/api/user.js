const express= require('express');
const router=express.Router();

const { check , validationResult}=require('express-validator/check');

const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');

const User=require('../../models/user');
 



// @route Post api/user
// @desc  register for new user Route
// @access Public
router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email',"Email is required").isEmail(),
    check('password','invalid password ').isLength({min:6})
],async (req,res)=> {
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors:err.array()});
    } 
    const {name, email, password}=req.body;
    try {
        // see if user exists
        let user =await User.findOne({email:email});
        if(user){
            return res.status(400).json({errors:[{msg:'User already exists'}]});
        }
        user=new User({
            name,
            email,
            password
        });
          
        //encrypt password
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        
        //return json web token 
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
const jwt=require('jsonwebtoken');
const config=require('config');


module.exports=function(req,res,next){
    const token=req.header('x-auth-token');

    if(!token) return res.status(401).json({msg:'No Token , authorization denied'});
    try{
        const decoded=jwt.verify(token,config.get('jwtSecret'));
        req.user=decoded.user; // in payload we attach id to user object
        next();
    }catch(err){
        res.status(401).json({msg:'token is not valid'});
    }
}
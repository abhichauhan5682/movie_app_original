const mongoose= require('mongoose');
const config=require('config');


const db=config.get('mongoURI'); // to get value globally we use config package


const connectDB= async()=>{
    try {
       await mongoose.connect(db,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex:true,
           useFindAndModify:false,
        }); // mongoose.connect return promise 
       console.log("connected");
    } catch (error) {
        console.log(error);
        //Exit process with failure
        process.exit(1);   
    }
}

module.exports=connectDB;
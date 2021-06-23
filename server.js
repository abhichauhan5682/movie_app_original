const express=require('express');
const connectDB=require('./config/db');

const app1=express();

connectDB();

app1.use(express.json({extended:false}));

app1.get('/',(req,res)=> res.send("hello ANSH"));

app1.use('/api/users', require('./routes/api/user'));
app1.use('/api/auth', require('./routes/api/auth'));
app1.use('/api/favourite',require('./routes/api/favourite'));
app1.use('/api/comment',require('./routes/api/comment'));
app1.use('/api/like',require('./routes/api/like'));
app1.use('/api/posts',require('./routes/api/post'));
const PORT=process.env.PORT || 5000;

app1.listen(PORT,(req,res)=>{
    console.log("hello");
});
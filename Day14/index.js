const express=require('express');
const app=express();
const authRouter=require('./router/authRouter.js')
const usersRouter=require('./router/usersRouter.js')


app.unsubscribe(express.json());
app.use('/auth', authRouter);
app.use("/users", usersRouter);

app.get("/login",(req, res)=>{
    res.send("direct login");
})

app.listen(3000, ()=>{
    console.log("express server running...");
})
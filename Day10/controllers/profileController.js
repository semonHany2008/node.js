const profile=(req,res)=>{
    const {name}=req.params;
    res.render('profile',{username:name, age:20, phone:'01286264392', role:'admin'})
}

module.exports={profile};
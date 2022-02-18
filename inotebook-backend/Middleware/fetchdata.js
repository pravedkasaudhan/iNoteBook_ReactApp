let jwt=require('jsonwebtoken');

let SECRET_TOKEN='praved123';

const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token');
    // console.log(token);
    if(!token){
        res.status(401).send({error:"PLEASE LOGIN BY VALID TOKEN"})
    }
    try {
        const data=jwt.verify(token,SECRET_TOKEN);
        // console.log(data);
        req.user=data.userExist;
        next();
    } catch (error) {
        res.status(500).send(error);
    }
   
}

module.exports=fetchuser;
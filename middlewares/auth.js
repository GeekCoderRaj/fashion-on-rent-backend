import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req,res,next)=>{
    let authHeader = req.headers.authorization;
    //console.log(authHeader);
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());
    }
    const token = authHeader.split(' ')[1];
    //console.log(token);
    try{
        const { _id} = await JwtService.verify(token);
        const user = {
            userId: _id
        }
        req.user = user;
        next();
    }catch(err){
        return next(CustomErrorHandler.unAuthorized());
    }
}
export default auth;
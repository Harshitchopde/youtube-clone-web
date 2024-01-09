import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req,res,next)=>{
    // here an error come related to verifyToken because we use req.user.id which assine value in verify token but some how it is not runing so i get an error req.user.id == undefiend
    const addComment = new Comment({userId:req.user.id,videoId:req.params.id,...req.body})
    
    try {
        // console.log(req.user.id);
    
        const saveComment = await addComment.save();
        res.status(200).json(saveComment);
        
    } catch (error) {
        next(error)
    }
}
export const delComment = async (req,res,next)=>{
    
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if(req.params.id===req.user.id || video.userId ===req.user.id){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted SuccessFul")
        }
    } catch (error) {
        next(error)
        
    }
}
export const getComment = async (req,res,next)=>{
    try {
        const getComment = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(getComment)
        
    } catch (error) {
        
    }
}
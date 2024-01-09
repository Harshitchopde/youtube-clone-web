import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

export const UpdateUser = async (req, res, next) => {
    console.log("in Update run");
    // check first that you are owner
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {

        }
    }
    else {
        next(createError(403, "You can only update your account"))
    }
}
export const getUser = async (req, res, next) => {
    try {
        // console.log("getUser run");
        
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }

}
export const deleUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const delet = await User.findByIdAndDelete(
                req.user.id
            );
            res.status(200).json("User has been deleted");
        } catch (error) {

        }
    }
    else {
        next(createError(403, "You can not only delete this account"))
    }
}
export const subUser = async (req, res, next) => {
    try {
        // the id that we get is not belong to us it is the other channel id that we have to add in our subscriber 
        console.log("1");

        await User.findByIdAndUpdate(req.user.id,
            {
                $push: { subscribersUser: req.params.id },
            },{new:true});
        console.log("2");

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        },{new:true})
        console.log("3");

        res.status(200).json("Suscribed successFull")
    } catch (error) {
next(error)
    }

}
export const unsubUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id,
            {
                $pull: { subscribersUser: req.params.id }
            },{new:true})
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        },{new:true})
        res.status(200).json("Unsuscribed successFull")
    } catch (error) {
        next(error)

    }
}
export const like =async (req, res, next) => {
      // current user id 
        const id = req.user.id;
        // id of current video to be like
        const videoId = req.params.videoId;
        try {
            await Video.findByIdAndUpdate(videoId,{
                $addToSet:{likes:id},
                $pull:{dislikes:id}
            })
            res.status(200).json("Liked video")
        } catch (error) {
            next(error)
        }
}
export const dislike =async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("disliked video")
    } catch (error) {
        next(error)
    }
}
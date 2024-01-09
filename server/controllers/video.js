import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js"

export const addVideo = async (req, res, next) => {
    // created new video with nessasory 
    // console.log("addvideo run");

    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        console.log("1");

        const savedvideo = await newVideo.save();
        console.log("2");

        res.status(200).json(savedvideo);

    } catch (error) {
        next(error)
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"))
        if (req.user.id === video.userId) {
            const updatVD = await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("this video successfull deleted")
        } else {
            return next(createError(403, "you can delete you video only"))
        }
    } catch (error) {

    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found"))
        if (req.user.id === video.userId) {
            const updatVD = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updatVD)
        } else {
            return next(createError(400, "you are not authorise to update"))
        }
    } catch (error) {

    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not Found"))
        }
        res.status(200).json(video)


    } catch (error) {

    }
}
export const addview = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        },{new:true})
        res.status(200).json("increase views")
    } catch (error) {

    }
}
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos)

    } catch (error) {

    }
}
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(videos)
    } catch (error) {

    }
}
export const sub = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);
        const subscriberChannel = user.subscribersUser;


        const list = await Promise.all(
            subscriberChannel.map((channel) => {
                return Video.find({ userId: channel })
            })
        )

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))

    } catch (error) {

    }
}
export const getbytags = async (req, res, next) => {
    const tags = req.query.tags.split(',')

    try {
        console.log(tags);
        // here i have done very sily mistake in use tag in video schema but here i use tags so it not work
        const video = await Video.find({ tag: { $in: tags } })
        res.status(200).json(video)

    } catch (error) {
        next(error)

    }
}
export const srch = async (req, res, next) => {
    const query = req.query.q

    try {
        const video = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40)


        res.status(200).json(video)

    } catch (error) {
        next(error)

    }
}
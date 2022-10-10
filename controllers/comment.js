import { createError } from "../error.js";
import Comment from "../models/Comment.js"
import Video from "../models/Video.js";

// ADD
export const addComment = async (req, res, next) => {
    const newComment = new Comment({ userId: req.user.id, ...req.body })
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    } catch (err) {
        next(err)
    }
}

// DELETE
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)

            res.status(200).json("The comment has been deleted")
        } else {
            next(createError(403, "You can only delete your comment"))
        }

    } catch (err) {
        next(err)
    }
}

// GET
export const getComment = async (req, res, next) => {
    try {
        const comment = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}
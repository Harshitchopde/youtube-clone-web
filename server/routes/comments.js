import express from "express"
import { addComment, delComment, getComment } from "../controllers/comment.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()

// ADD COMMENT
router.post('/:id',verifyToken,addComment)
// DELETE COMMENT
router.delete('/:id',delComment)
// GET VIDEO COMMENT
router.get('/:videoId',getComment)
export default router;

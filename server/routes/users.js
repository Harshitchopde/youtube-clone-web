import express from "express"
import {deleUser,dislike,getUser,like,subUser,unsubUser,UpdateUser} from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()
// router.get('/test',test)

//UPDATE USER
router.put('/:id',verifyToken, UpdateUser)
// DELETE USER
router.delete('/:id',verifyToken,deleUser)
// GET A USER
router.get('/find/:id',getUser)
// SUBSCRIBE A USER
router.put('/sub/:id',verifyToken,subUser)
// UNSUBSCRIBE A USER
router.put('/unsub/:id',verifyToken,unsubUser)
// LIKE  USER
router.put('/like/:videoId',verifyToken,like)
// DISLIKE USER
router.put('/dislike/:videoId',verifyToken,dislike)

export default router;

import express from "express"
import { addVideo, addview, deleteVideo, getVideo, getbytags, random,srch, sub, trend, updateVideo } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()
router.put('/:id',verifyToken, updateVideo)
router.delete('/:id',verifyToken,deleteVideo)
router.post('/',verifyToken,addVideo)
router.get('/find/:id',getVideo)
router.put('/view/:id',addview)
router.get('/trend',trend)

router.get('/random',random)
router.get('/sub',verifyToken,sub)
router.get('/tags',getbytags)
router.get('/search',srch)

// for another project 
router.post('/trend',trend)
router.put('/trend',trend)
router.delete('/trend',trend)
export default router;

import mongoose from "mongoose";

const VideoSchema =new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
       
    },
    desc:{
        type: String
      
       
    },
    imgUrl:{
        type:String,
        default:""
    
    },
    videoUrl:{
       type:String,
       default:""

    },
  views:{
    type:Number,
    default:0
  },
  tag:{
    type:[String]
  },
  likes:{
    type:[String],
    default:[]
  },
  dislikes:{
    type:[String],
    default:[]
  }
},{timestamps:true})

export default mongoose.model('Videos',VideoSchema);
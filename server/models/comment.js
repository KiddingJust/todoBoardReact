import mongoose from 'mongoose';
import moment from 'moment';

// Create Schema
const CommentSchema = new mongoose.Schema({
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"), //Date.now,  //mongo db는 utc 기준이므로 한국은 9시가 빠르게 됨
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const Comment = mongoose.model("omment", CommentSchema); // 위에 작성한 걸 user라 정의함

export default Comment;        //Post 모델을 모듈화하여 내보내는 것. 
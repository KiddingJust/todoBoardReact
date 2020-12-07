import mongoose from 'mongoose';
import moment from 'moment';


// Create Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,        // 제목 검색 가능하도록
    },
    contents: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: -2,        //처음 작성 당시에도 조회수 기록되기 때문
    },
    fileUrl: {
        type: String,
        default: "https://source.unsplash.com/random/301x201",  //빈 화면 막으려고...
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",        //1개의 post는 1개의 카테고리 갖도록 하여 배열이 아님 
    },
    date: {
        type: String,
        ref: moment().format("YYYY-MM-DD hh:mm:ss"), //Date.now,  //mongo db는 utc 기준이므로 한국은 9시가 빠르게 됨
    },
    comments: [    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"     //앞의 user.js를 참조하는 것. 
    }
});

const Post = mongoose.model("post", PostSchema); // 위에 작성한 걸 user라 정의함

export default Post;        //Post 모델을 모듈화하여 내보내는 것. 
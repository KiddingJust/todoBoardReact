import mongoose from 'mongoose'
import moment from 'moment';

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,       //email을 통해 이전 가입자인지 체크 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["MainJuin", "SubJuin", "User"], 
        default: "User",
    },
    register_date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss"), //Date.now,  //mongo db는 utc 기준이므로 한국은 9시가 빠르게 됨
    },
    comments: [     //한 사람이 여러개의 post와 comment를 할 수 있음. 1:N 관계
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post",
            },
            comment_id: {       //post 하나를 지울 떄 관련된 comments도 지우는 것. 이건 잘 이해 안됨. 
                type: mongoose.Schema.Types.ObjectId,
                ref: "comments",
            },
        },
    ],
    posts: [        // 1:N 구조. 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    ],
});

const User = mongoose.model("user", UserSchema); // 위에 작성한 걸 user라 정의함

export default User;        //User 모델을 모듈화하여 내보내는 것. 
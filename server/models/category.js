import mongoose from 'mongoose';


// Create Schema
const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: "미분류",       
    },
    posts: [    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ],
});

const Category = mongoose.model("category", CategorySchema); // 위에 작성한 걸 user라 정의함

export default Category;        //Post 모델을 모듈화하여 내보내는 것. 
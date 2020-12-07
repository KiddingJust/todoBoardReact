import express from 'express'

// Model
import Post from '../../models/post' 
import auth from '../../middleware/auth';

import "@babel/polyfill";
const router = express.Router()

// api/post. res는 서버에서 브라우저 쪽으로 응답하는 것. 
router.get('/', async(req, res)=> {
    //이 주소로 들어오면 모든 포스트 볼 수 있도록
    //await 는 es6 에서 나온 문법으로,
    //모든 것을 find 할 떄까지 다음으로 넘어가지 않도록 선언하는 것
    const postFindResult = await Post.find()
    console.log(postFindResult, "All Post Get");
    res.json(postFindResult); 
})

router.post('/', auth, async(req, res, next) => {
    try{
        console.log(req, "req")
        const {title, contents, fileUrl, creator} = req.body
        // 실제로는 req.body.title, req.body.contents 등으로 분해해 넣을 것.
        
        //들어온 내용으로 해당 필드들을 채워주라는 것. 
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        });
        res.json(newPost)
    }catch(e){
        console.log(e)
    }
});

//router를 모듈화해서 빼주는 것. 
//default 로 빼내면, 한개만 내보낼 수 있음. -> 다른 곳에서 이름을 자유롭게  지을 수 있음.
//export const name =  ~ 으로 하면 이름이 정해짐 
export default router;

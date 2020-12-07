import app from "./app";
import config from './config/index'

const {PORT} = config
 app.listen(PORT, ()=>{   //7000번으로 들어오면
     console.log(`Server started on Port ${PORT}`);   //₩₩을 통해 텍스트와 변수 섞어서 문자 만듦.
 })



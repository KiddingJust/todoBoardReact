import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from 'path';


//Routes
import postsRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';
 
const app = express()
const {MONGO_URI} = config

const prod = process.env.NODE_ENV === "production";

//서버의 보안 부분을 보완해주는 라이브러리
app.use(hpp());
app.use(helmet());

//cors 모두 허용
app.use(cors({origin: true, credentials: true}))
//개발 시 로그 보는 것. 
app.use(morgan("dev"))

/*
http 메서드에는 get, post 등이 있는데, 서버에서 requestBody에 내용 담겨서 오는데
이 body에 있는 걸 서버에서 해석하기 위해서는 미들웨어 필요
이전에는 body parser 추가로 설치했는데, 지금은 express에 내장되어있음. 
*/
app.use(express.json())


mongoose.connect(MONGO_URI, {
    useNewUrlParse: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    .then(()=> console.log("MongoDB connecting success!"))
    .catch((e) => console.log(e));

    // Use routers
    app.get("/");        //신호 들어온 걸 모두 받아들이게
    app.use('/api/post', postsRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);

    if (prod) {
        app.use(express.static(path.join(__dirname, "../client/build")));
        app.get("*", (req, res) => {
          res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
        });
    }


export default app; //모듈화 시켜서 다른 곳에서 파일 불러올 수 있게끔 하는 부분
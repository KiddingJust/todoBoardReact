import jwt from 'jsonwebtoken';
import config from '../config/index'

const {JWT_SECRET} = config

const auth = (req, res, next) => {
    //토큰 값은 헤더에 저장되어 있음
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({mst: "토큰 없음. 인증 거부!"})
    }
    try {
        //토큰 해석
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        //req.user와 같으면 다음으로 넘어감
        next()
    }catch (e) {
        console.log(e)
        res.status(400).json({msg: "토큰이 유효하지 않습니다."})
    }
}

export default auth;
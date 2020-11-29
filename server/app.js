import express from 'express'

const app = express()

app.get('/')        //신호 들어온 걸 모두 받아들이게

export default app; //모듈화 시켜서 다른 곳에서 파일 불러올 수 있게끔 하는 부분
const express = require('express');
const bodyParser = require('body-parser');
const inferSchema = require('./api_inference/inferSchema.js');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = 3000; //서버 포트 번호

//클라이언트에서 HTTP 요청
app.get('/',(req, res) => {
    res.send('Hello World!');
});

//api test response 결과 조회
app.post('/response', (req, res) => {
    //response 결과 읽어오기
    console.log(req.body);
    
    const json_data = req.body;
    
    //자료형 추론
    var isArray = false;
    if(Array.isArray(json_data)) isArray= true;

    const schema = inferSchema(json_data,isArray);

    //출력
    console.log("======자료형 추론======");
    console.log(schema);

    //response 결과 db 에 저장해야함
    res.send("자료형 추론 성공");
})

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
})


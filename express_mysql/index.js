var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var dbconfig = require('./database.js');
var conn = mysql.createConnection(dbconfig);
const app = express();
app.use(express.json()); // bodyParser 사용 설정

app.get('/', function(req, res){
    res.send('This is root');
});

// 모든 정보 읽어오도록하기
app.get('/signup/', function(req, res){
    conn.query('SELECT * FROM user', function(err, rows){
        if(err) throw err;
        console.log(rows[0]);
        var html = `<p>${rows[0].email}</p>`; 
        res.send(html);
    });
})

// 비밀번호 암호화, 중복검사 추가하기
app.post('/signup/', function(req, res){
    console.log(req.body);
    var email = req.body["email"];
    var username = req.body["username"];
    var sql = 'INSERT INTO user(email, username) VALUES(?, ?);' // sql문을 객체로 만들까
    var params = [email, username];
    conn.query(sql, params, function(err, rows, fields){
        if(err) console.log('err : ', err);
        else{console.log('save success');}
    });
    res.status(201).json('signup success');
});

app.listen(3000, function(){
    console.log('app listening on port 3000');
})
var express = require('express');
var db = require('../db/basic');
var router = express.Router();

router.post('/join', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    db(function(err,connenction){
        connenction.query("INSERT INTO MEMBER (NAME,EMAIL,PASS) VALUES " +
            "('"+name+"','"+email+"','"+password+"')",
        function(err, rows) {
            if (err) throw err;
            res.send(rows);
            connenction.release();
        })
    });
});

router.post('/login', function(req, res, next) {
    var email = req.body.email.trim();
    var password = req.body.password.trim();
    var sess = req.session;
    sess.userInfo={};
    db(function(err,connenction){
        connenction.query("SELECT MEM_NO,NAME,EMAIL FROM MEMBER " +
            "WHERE EMAIL='"+email+"' AND PASS = '"+password+"'",
            function(err, rows) {
                if (err) throw err;
                if(rows.length===1){
                    sess.userInfo.name=rows[0].NAME;
                    sess.userInfo.email=rows[0].EMAIL;
                    sess.userInfo.memNo=rows[0].MEM_NO;
                }
                res.send(sess);
                connenction.release();
            })
    });
});


module.exports = router;

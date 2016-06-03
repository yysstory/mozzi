var express = require('express');
var db = require('../db/basic');
var router = express.Router();

router.post('/write', function(req, res, next) {
    var session = req.session;
    var memNo = session.userInfo.memNo;
    var boardNo = req.body.boardNo;
    var content = req.body.content;
    db(function(err,connenction){
        connenction.query("INSERT INTO REPLY " +
            " (MEM_NO,BOARD_NO,CONTENT,REG_DATE) VALUES " +
            "('"+memNo+"','"+boardNo+"','"+content+"',CURDATE())",
            function(err, rows) {
                if (err) throw err;
                res.send(rows);
                connenction.release();
            })
    });
});

router.post('/read', function(req, res, next) {
    var boardNo = req.body.boardNo
    db(function(err,connenction){
        connenction.query("SELECT R.REPLY_NO ,R.BOARD_NO ,R.MEM_NO " +
            " ,R.CONTENT ,R.REG_DATE, M.NAME  " +
            " FROM REPLY R, MEMBER M  " +
            " WHERE R.MEM_NO = M.MEM_NO AND R.BOARD_NO ="+boardNo+
            " ORDER BY R.REG_DATE DESC",
            function(err, rows) {
                if (err) throw err;
                res.send(rows);
                connenction.release();
            })
    });
});

module.exports = router;

var express = require('express');
var db = require('../db/basic');
var router = express.Router();

router.post('/write', function(req, res, next) {
    var session = req.session;
    var memNo = session.userInfo.memNo;
    var title = req.body.title;
    var content = req.body.content;
    db(function(err,connenction){
        connenction.query("INSERT INTO BOARD (MEM_NO,TITLE,CONTENT,REG_DATE) VALUES " +
            "('"+memNo+"','"+title+"','"+content+"',CURDATE())",
            function(err, rows) {
                if (err) throw err;
                res.send(rows);
                connenction.release();
            })
    });
});


router.post('/read', function(req, res, next) {
    db(function(err,connenction){
        connenction.query("SELECT B.BOARD_NO,B.MEM_NO,B.TITLE,B.CONTENT,B.REG_DATE, " +
            " IFNULL(B.LIKE_CNT,0) LIKE_CNT,B.LOCATION,M.NAME, " +
            " (SELECT COUNT(*) FROM REPLY WHERE BOARD_NO = B.BOARD_NO) REPLY_CNT " +
            " FROM BOARD B,MEMBER M WHERE B.MEM_NO = M.MEM_NO ORDER BY B.BOARD_NO DESC",
            function(err, rows) {
                if (err) throw err;
                res.send(rows);
                connenction.release();
            })
    });
});

router.get('/read', function(req, res, next) {
    db(function(err,connenction){
        connenction.query("SELECT B.BOARD_NO,B.MEM_NO,B.TITLE,B.CONTENT,B.REG_DATE, " +
            " IFNULL(B.LIKE_CNT,0) LIKE_CNT,B.LOCATION,M.NAME, " +
            " (SELECT COUNT(*) FROM REPLY WHERE BOARD_NO = B.BOARD_NO) REPLY_CNT " +
            " FROM BOARD B,MEMBER M WHERE B.MEM_NO = M.MEM_NO ORDER BY B.BOARD_NO DESC",
            function(err, rows) {
                if (err) throw err;
                res.send(rows);
                connenction.release();
            })
    });
});

module.exports = router;

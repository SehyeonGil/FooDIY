/**
 * Created by Sehyeon on 2017-08-10.
 */
/**
 * Created by Sehyeon on 2017-08-06.
 */
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//동기화 모듈
var async = require('async');

//DB 모델
var Member = require('../models/member');
var Menu = require('../models/menu');
var Message = require('../models/message');
var Conversation = require('../models/conversation');


//패스포트 및 세션 유지
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

router.post('/',function (req, res, next) {
    var member=req.body.member;
    Conversation.findOne({from:req.session.email, to:member},function (err, conver) {
        if(!conver)
        {
            var newConver=new Conversation;
            newConver.from=req.session.email;
            newConver.to=member;
            newConver.save(function (err) {
                Conversation.findOne({from:req.session.email, to:member},function (err, conver) {
                    res.redirect('/message/'+conver.id);
                });
            });
        }
        else
        {
            res.redirect('/message/'+conver.id);
        }
    })
});
/*router.post('/submit',function (req, res, next) {
    var content=req.body.content;
    var myname=req.body.myname;
    var connum=req.body.connum;


    var newMessage=new Message;
    newMessage.content=content;
    newMessage.from=myname;
    newMessage.conver_id=connum;
    newMessage.save(function (err) {
        res.send('clear');
    });
});*/
router.get('/:id', function (req, res, next) {
    var connum=req.params.id;
    var memberemail;
    var i=0;
    Conversation.findOne({_id:connum},function (err, conver) {
        if (conver.to === req.session.email) {
            memberemail = conver.from;
            i = 1;
        }
        else {
            memberemail = conver.to;
            i = 1;
        }
        if (i === 1)
        {
            Member.findOne({email:memberemail},function(err,member) {
                Message.find({conver_id: connum}, {
                        /*skip:0, // Starting Row
                         limit:10, // Ending Row
                         sort:{
                         time_created: -1 //Sort by Date Added DESC
                         }*/
                    },
                    function (err, message) {
                        //console.log(message);
                        res.render("message", {session: req.session, member: member, message: message, connum: connum});
                    });
            });
        }
    });
});


module.exports = router;
/**
 * Created by Sehyeon on 2017-07-24.
 */
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
//var mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var session=require('express-session');
app.use(session({
    secret: '123456789!@#$',
    resave: false,
    saveUninitialized: true
}));
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
require('../config/passport')(passport);

/*var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
 // we're connected!
 });*/

function logincheck (req,res,next) {
    if(!req.session.user)
    {
        res.redirect('/seller');
    }
    else if(!req.session.seller)
    {
        res.redirect('/seller/submit_seller');
    }
    else
    {
        return next();
    }
}
function sellercheck (req,res,next) {
    if(!req.session.user)
    {
        res.redirect('/seller');
    }
    else
    {
        return next();
    }
}
/* GET home page. */
router.get('/', function(req, res, next) {
    /*if (req.isAuthenticated()){
     console.log("logged in");
     res.render('manage_menu');
     } else {
     res.redirect('/');
     }*/
    res.render('manage_menu');
});
router.get('/manage' ,logincheck,function(req, res, next) {
    res.render('manage_menu');
});
router.get('/submit_menu',logincheck,function(req, res, next) {
    res.render('become_foodiy2');
});
router.get('/submit_seller', sellercheck, function(req, res, next) {
    res.render('become_foodiy');
});
router.post('/submit_seller', function(req, res, next) {
    var choice_mail=req.body.choice_mail;
    var tell=req.body.tell;
    var choice_sms=req.body.choice_sms;
    var post=req.body.post;
    var add1=req.body.add1;
    var add2=req.body.add2;
    var pointx=req.body.pointx;
    var pointy=req.body.pointy;
    Member.findOne({ email : req.session.user }, function(err, member) {
        if (err) return res.status(500).json({error: err});
        if (!member) {
            return res.send('판매자 등록에 실패했습니다.');
        } else {
            member.mailing=choice_mail;
            member.text=choice_sms;
            member.cellphone=tell;
            member.address.post=post;
            member.address.add1=add1;
            member.address.add2=add2;
            member.address.x=pointx;
            member.address.y=pointy;
            member.sellercheck=true;
            member.save(function (err) {
                if (err)
                    throw err;
                res.send('clear');
            });
        }
    });
});
router.get('/jusoPopup', function(req, res, next) {
    res.render('juso');
});
router.post('/jusoPopup', function(req, res, next) {
    var inputYn = req.body.inputYn;
    var roadFullAddr = req.body.roadFullAddr;
    var roadAddrPart1 = req.body.roadAddrPart1;
    var roadAddrPart2 = req.body.roadAddrPart2;
    var engAddr = req.body.engAddr;
    var jibunAddr = req.body.jibunAddr;
    var zipNo = req.body.zipNo;
    var addrDetail = req.body.addrDetail;
    var admCd    = req.body.admCd;
    var rnMgtSn = req.body.rnMgtSn;
    var bdMgtSn  = req.body.bdMgtSn;
    var detBdNmList  = req.body.detBdNmList;
    var bdNm  = req.body.bdNm;
    var bdKdcd  = req.body.bdKdcd;
    var siNm  = req.body.siNm;
    var sggNm  = req.body.sggNm;
    var emdNm  = req.body.emdNm;
    var liNm  = req.body.liNm;
    var rn  = req.body.rn;
    var udrtYn  = req.body.udrtYn;
    var buldMnnm  = req.body.buldMnnm;
    var buldSlno  = req.body.buldSlno;
    var mtYn  = req.body.mtYn;
    var lnbrMnnm  = req.body.lnbrMnnm;
    var lnbrSlno  = req.body.lnbrSlno;
    var emdNo  = req.body.emdNo;
    var entX  = req.body.entX;
    var entY  = req.body.entY;
    res.render('juso',{inputYn:inputYn,roadFullAddr:roadFullAddr,roadAddrPart1:roadAddrPart1,roadAddrPart2:roadAddrPart2,engAddr:engAddr,jibunAddr:jibunAddr,zipNo:zipNo,addrDetail:addrDetail,admCd:admCd,rnMgtSn:rnMgtSn,
        bdMgtSn:bdMgtSn,detBdNmList:detBdNmList,bdNm:bdNm,bdKdcd:bdKdcd,siNm:siNm,sggNm:sggNm,emdNm:emdNm,liNm:liNm,rn:rn,udrtYn:udrtYn,buldMnnm:buldMnnm,buldSlno:buldSlno,mtYn:mtYn,lnbrMnnm:lnbrMnnm,lnbrSlno:lnbrSlno,emdNo:emdNo,entX:entX,entY:entY});
});
router.get('/juso', function(req, res, next) {
    res.render('jusoindex');
});
module.exports = router;
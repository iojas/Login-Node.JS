var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
    //res.render('login', { title: 'Login' });
    var connection = mysql.createConnection({
        host: 'malisamaj1.crwqdxb9dkgh.us-west-2.rds.amazonaws.com',
        user: 'malisamaj',
        password: 'malisamaj',
        database: 'ojas'
    })
    connection.connect(function(err) {
        if (err) {
            res.send(err);
            throw err
        }

        console.log('You are now connected...');
        if(req.body.email=='' || req.body.password==''){
            res.render('register', { error: "Please Enter Email and Password" });  return;
        }
        connection.query('select * from user where email=? and password=?',
            [req.body.email,req.body.password],
            function(err, result) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log(result);
                res.redirect("dashboard");
            })


    });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Regigster', error: '' });
});

router.post('/register', function(req, res, next) {
  ///res.json(req.body);
    var connection = mysql.createConnection({
        host: 'malisamaj1.crwqdxb9dkgh.us-west-2.rds.amazonaws.com',
        user: 'malisamaj',
        password: 'malisamaj',
        database: 'ojas'
    })
    //var obj=[{name:'ojas'}];
    var ret = [];
    connection.connect(function(err) {
        if (err) {
            res.send(err);
            throw err
        }

        console.log('You are now connected...');
        if(req.body.name=='' || req.body.lname=='' || req.body.email==''  || req.body.password==''){
            res.render('register', { error: "Please Enter all Data" });  return;
        }
        connection.query('insert into user (name, lname, email,password) values (?,?,?,?)',
            [req.body.name,req.body.lname,req.body.email,req.body.password],
            function(err, result) {
                if(err){
                    if (err.errno==1062) {res.render('register', { error: "Please user Unique Email" });  return;}
                    else  {console.log(err);res.render('register', { error: err });  return;}

                }
                console.log("added data successfully");
                res.redirect("dashboard ");
            })


        });

    });



router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;

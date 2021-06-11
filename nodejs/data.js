var http = require('http');
var bodyparser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
const cors = require('cors');
var app = express();
app.set('port', 3000);
app.use(bodyparser.json({ limit: '100mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: '100mb', extended: true }))
app.use(cors());
var server = http.createServer(app);
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'socialbook789@gmail.com',
		pass: 'Social@789'
	}
});

var mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/sbook");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', mongoConnected);

function mongoConnected() {
    var userSchema = new mongoose.Schema({
        fname: String,
        lname: String,
        mname: String,
        email: String,
        password: String,
        gender: String,
        dob: String,
        hobbies: String,
        city: String,
        state: String,
        imageUrl: String,
        friends: [String],
        friendreq: [String]
    }, { collection: 'users' });

    var user = mongoose.model("user", userSchema);

    var postSchema = new mongoose.Schema({
        userid: String,
        imageUrl: String,
        description: String,
        fname: String,
        lname: String,
        profileUrl: String,
        uploaded: { type: Date, default: Date.now },
    }, { collection: 'posts' });

    var post = mongoose.model("posts", postSchema);

    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../src/assets/profiles/');
        },
        filename: (req, file, cb) => {
            var filetype = '';
            if (file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            cb(null, 'image-' + Date.now() + '.' + filetype);
        }
    });

    var upload = multer({ storage: storage });
    
    app.post('/userpost', upload.single('file'), function (req, res, next) {
        if (!req.file) {
            return res.status(500).send({ message: 'Upload fail' });
        }
        else {
            req.body.imageUrl = 'assets/profiles/' + req.file.filename;
            post.create(req.body, function (err, img) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    res.status = 200;
                    res.send(img);
                }
            });
        }
    });

    app.get("/posts", (req, res) => {
        post.find(function (err, posts) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("All posts returned");
                res.status(200);
                res.send(posts);
            }
        });
    });

    app.get('/userposts/:id', function (req, res) {
        post.find({ userid: req.params.id }, function (err, img) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(img);
            }
        });
    });

    app.post("/register",upload.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(500).send({ message: 'Upload fail' });
        }
        else {
            req.body.imageUrl = 'assets/profiles/' + req.file.filename;
            user.create(req.body, function (err, img) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    res.status = 200;
                    res.send(img);
                }
            });
        }
    });
    app.put("/updateDetails", (req, res) => {
        user.findOneAndUpdate(
            { email: req.body.email },
            req.body,
            { new: true },
            function (err, usr) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                else {
                    res.status = 200;
                    res.send({ "msg": "User record updated!" });
                }
            })

    });
    app.put("/blockuser", (req, res) => {
        user.findOneAndDelete(
            { email: req.body.email }, req.body,
            function (err, usr) {
                if (err) {
                    res.status(400);
                    res.send(err);
                }
                else {
                    res.status = 200;
                    res.send({ "msg": "User Blocked!" });
                }
            }
        );
    });
    app.get("/users/:id", (req, res) => {
        user.find({ email: req.params.id }, function (err, user) {
            if (err) {
                console.log("Unable to find a user");
                res.status(400);
                res.send(err);
            }
            else {
                if (Array.isArray(user)) {
                    if (user.length == 0) {
                        console.log("Unable to find a user")
                        res.send({ "msg": "Unable to find a user" })
                    }
                    else {
                        console.log("user record returned");
                        res.send(user);
                    }
                }
            }
        });
    });
    app.get("/users", (req, res) => {
        user.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("All users returned");
                res.status(200);
                res.send(users);
            }
        });
    });

    app.get("/sendmail/:userid/:otp", (req, res) => {
        var mailOptions = {
            from: 'socialbook789@gmail.com',
            to: req.params.userid,
            subject: "reset password",
            text: "One Time Password for reset password of your sbook account is " + req.params.otp
        };    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(info);
            }
        });
    });
    

}



server.listen(3000, () => {
    console.log("Listineng on port 3000")
});

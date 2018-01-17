var express = require('express');
var router = express.Router();
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3')
var path = require('path');
var middleware = require ("../middleware");
var mime = require('mime-types');
var fs = require("fs");

var s3 = new aws.S3();

//AWS CONFIG
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4'
});

//STORAGE ENGINE 
var storage = multerS3({ 
    s3: s3,
    bucket: "solverbay",
    key: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

//INIT UPLOAD
var upload = multer({
    storage: storage,
    limits:{fileSize: 2000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single("uploadedFile");


//CHECK FILE TYPE
function checkFileType(file, cb){
    // Allowed extensions
    var filetypes = /jpeg|jpg|pdf|txt|png|/;
    // Check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mimetype
    var mimetypeVar = (mime.lookup(file.originalname) == file.mimetype);
    
    if(extname && mimetypeVar){
    return cb(null, true);
    } else {
    cb("File type/size not allowed");
    }
} 

//UPLOAD ROUTE
router.post ("/upload", middleware.isLoggedIn, function(req, res) {
    upload(req, res, function (err) {
        if(err) {
            res.json("File type/size not allowed");
        } else if (req.file == undefined) {
            res.json("No file selected");                    
        } else {
            res.json(req.file);
        }
    });
});

//DOWNLOAD ROUTE
router.get("/download/:file", function(req, res) {

    var params = {
        Bucket: "solverbay", 
        Key: req.params.file
    };

    var fileStream = s3.getObject(params).createReadStream();    
    fileStream.pipe(res);
    res.attachment(req.params.file.substring(14));
});

module.exports = router;
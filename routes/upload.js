var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var middleware = require ("../middleware");
var mime = require('mime-types');


//STORAGE ENGINE 
var storage = multer.diskStorage({ 
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//INIT UPLOAD
var upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
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

module.exports = router;
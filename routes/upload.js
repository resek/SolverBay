var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var middleware = require ("../middleware");


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
    limits:{fileSize: 2000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

var cpUpload = upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 }])

//CHECK FILE TYPE
function checkFileType(file, cb){
    // Allowed extensions
    var filetypes = /jpeg|jpg|pdf|txt|docx|xlsx|png|gif/;
    // Check extensions
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    var mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
    return cb(null,true);
    } else {
    cb('Error: File type not allowed');
    }
} 

//UPLOAD ROUTE
router.post ("/upload", middleware.isLoggedIn, function(req, res) {
    cpUpload(req, res, function (err) {
        if(err) {
            res.render('challenge/new', {msg: err});
        } else if (Object.keys(req.files).length < 1) {
            res.render('challenge/new', { msg: 'Error: No file selected' });            
        } else {
            res.render('challenge/new', { msg: 'File(s) uploaded' });
        }
    });
});

module.exports = router;
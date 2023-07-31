// const express= require('express');
// const app = express();
// app.listen(3000);
// const aws= require('aws-sdk');
// const multer= require('multer');
// const multerS3= require('multer-s3');
// aws.config.update({
//     secretAccessKey: 'AKIA43YQHWXXNWTUBEXG',
//     accessKeyId: 'vGLVIY/D6/qtu8CsSOOStD+tvzIfYsiBBURM3cKU',
//     region: 'ap-southeast-2',
// });

// const s3= new aws.S3();

// const BUCKET= process.env.BUCKET

// const upload= multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: BUCKET,
//         acl: 'public-read',
//         key : function(req, file, cb){
//             cb(null, file.originalname);
//         }
//     })
// });



const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
  
src/config/db.js;
AWS.config.update({
ACCESS_KEY:'AKIA43YQHWXXNWTUBEXG',
  secretAccessKey: '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',
  region: 'ap-southeast-2',
});

const s3 = new AWS.S3();
const con = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password:"123456789",
  port: 3306,
});

con.connect((err, conn) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }else
  console.log('Connected to database');
});

app.use(express.json());

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 's3nodejs123',
    acl: 'public-read',
  }),
});

app.post('/upload', upload.single('file'), function(req, res, next){
    console.log(req.file);
    res.send("Uploaded! : "+req.file.location+" location");
});
app.get('/list', async(req, res, next)=>{
   let r= await s3.listObjects({Bucket: BUCKET}).promise();
let x= r.Contents.map(item=>item.key);
res.send(x);
});
app.get("/download/:filename", async(req, res, next)=>{
const filename= req.params.filename;
let x= await s3.getObject({Bucket: BUCKET, Key: filename}).promise();
res.send(x.Body);
})

app.delete("/delete/:filename",async(req, res, next)=>{
const filename= req.params.filename;
await s3.deleteObject({Bucket: BUCKET, Key: filename}).promise();
res.send("Deleted!")
})
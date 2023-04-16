const express = require('express');
require('dotenv').config({path: './../.env'});
const cors = require('cors');
const mongoose = require("mongoose");
const Post = require('./PostSchema');
const app = express(); 
const uploadMiddleware = require('./Multer');
const fs = require('fs');
const { MIMEType } = require('util');
const bodyParser = require('body-parser');
const { publicDecrypt } = require('crypto');
const { file } = require('@babel/types');
const cloudinary = require('cloudinary').v2;




app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
//app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewURLParser: true
  }
).then(() => console.log('DB Connection Successfull'))
 .catch((err) => {
    console.error(err);
});;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_API_KEY,
  api_secret: process.env.REACT_APP_API_SECRET,
});
//async function handleUpload(file) {
  //const response = await cloudinary.uploader.upload(file, {
    //resource_type: "auto",
  //});
  //return response;

//}



app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
 try {
  //const base64 = Buffer.from(req.file.buffer).toString("base64");
  //let dataURI = "data:" + req.file.mimetype + ";base64," + base64;
  //const cldRes = handleUpload(dataURI);
 
  const result = await cloudinary.uploader.upload(req.file.path);

    const {title,summary,content, author, tag} = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    image: result.secure_url,
    image_id: result.public_id,
    author,
    tag,
  });
  res.json(postDoc);
 } catch (error) {
  
  console.log(error)
 }
  });



app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  try {
    const {id,title,summary,content,author,tag} = req.body;
    const postDoc = await Post.findById(id);
    await cloudinary.uploader.destroy(public_id)

    const result = await cloudinary.uploader.upload(req.file.path);
    if (!id) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      author,
      image: result.secure_url || result.image,
      image_id: result.public_id || result.image_id,
      content,
      tag,
    });

    res.json(postDoc);
  } catch (err) {
    console.log(err)
  }

  });


app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .sort({createdAt: -1})
      .limit(4)
  );
});

app.get('/post/:id', async (req, res) => {
try {
  const {id} = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
} catch (error) {
  return console.error(error);
  
};

});

app.delete('/post/:id', async (req, res) => {
  try {
    
    const postDoc = await Post.findByIdAndRemove(req.params.id)
    //Delete image from cloudinary
    await cloudinary.uploader.destroy(postDoc.image_id);
     res.json(postDoc)
  } catch (error) {
    return console.error(error)
  }
})

app.get('/post/:author', async (req, res) => {
  try {
    const {author} = req.params;
    const postDoc = await Post.find(author);
    res.json(postDoc);
  } catch (error) {
    return console.error(error);
    
  };
  
  });

app.listen(process.env.REACT_APP_PORT);

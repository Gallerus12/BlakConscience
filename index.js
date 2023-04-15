const express = require('express');
require('dotenv').config({path: './../.env'})
const cors = require('cors');
const mongoose = require("mongoose");
const Post = require('./PostSchema');
const app = express();
const multer = require('multer'); 
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const { MIMEType } = require('util');
const bodyParser = require('body-parser')




app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
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




app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  console.log({files:req.file})
 const {originalname,path} = req.file ;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

    const {title,summary,content, author, tag} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author,
      tag,
    });
    res.json(postDoc);
  });



app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;

  try {
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  }
  catch(TypeError) {
     if(req.file != MIMEType('image/*')) {
      window.alert('Please upload an image')
      return TypeError
    }
  }


    
    const {id,title,summary,content,author,tag} = req.body;
    const postDoc = await Post.findById(id);
    if (!id) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      author,
      content,
      tag,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
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

app.get('/post/:author', async (req, res) => {
  try {
    const {author} = req.params;
    const postDoc = await Post.find(author);
    res.json(postDoc);
  } catch (error) {
    return console.error(error);
    
  };
  
  });
app.listen(process.env.PORT || 4000)


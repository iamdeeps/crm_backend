const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Deepak:Qwerty12345@cluster0.0ghtd.mongodb.net/crm-project?retryWrites=true&w=majority")
    .then(()=>{
      console.log('db connected successfully')
    })
    .catch(()=>{
      console.log('db connection failed')
    })

/* Save user */
router.get('/postUser', async function(req, res, next) {
  const post = new Post({
    name:req.body.name,
    email:req.body.email,
    age:req.body.age
  })
  let saveResponse = await post.save()
  console.log("🚀 ~ file: users.js ~ line 13 ~ router.get ~ saveResponse", saveResponse)
  res.status(200).json({
    message:'data sent'
  })
});

/* Fetch user */
router.get('/fetchUser', async function(req, res, next) {
   
  let fetchingData = await post.find()
  res.status(200).json({
    message:'data sent'
  })
});


module.exports = router;

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
router.post('/postUser', async function(req, res, next) {
  console.log('req.body',req.body)
  const post = new Post({
    name:req.body.name,
    email:req.body.email,
    age:req.body.age
  })
  post.save()
  .then((savedResponse)=>{
    res.status(200).json({
      message:'data saved successfully',
      data:savedResponse,
    })
  })
});

/* Fetch user */
router.get('/fetchUser', async function(req, res, next) {
  console.log('fetchUser',req.body)
  Post.find()
  .then((fetchedData)=>{
    res.status(200).json(
      fetchedData
    )
  })
});


module.exports = router;

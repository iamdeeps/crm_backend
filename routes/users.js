const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const jwtDecoder = require('jwt-decode')
//const env = require('../env').Environment

//mongodb+srv://${env.mongoDbUser}:${env.mongoDbUser}@cluster0.0ghtd.mongodb.net/crm-project?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://Deepak:Qwerty12345@cluster0.0ghtd.mongodb.net/crm-project?retryWrites=true&w=majority`)
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
    dateOfBirth:req.body.dateOfBirth
  })
  post.save()
  .then((savedResponse)=>{
    res.status(200).json({
      message:'data saved successfully',
      data:savedResponse,
    })
  })
});

//google login authentication 
router.post('/googleLogin',async function(req,res,next){
  console.log('req.body',req.body)
  let googleLoginDetails = jwtDecoder(req.body.credential)
  console.log("🚀 ~ file: users.js ~ line 39 ~ router.post ~ googleLoginDetails", googleLoginDetails)
  res.status(200).json({
    message:'login success',
    userData:googleLoginDetails
  })
})

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

//let userName= 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodemailtesting1303@gmail.com',//env.gmailUser,
    pass: 'Qwerty@12345',//env.gmailPass,
  }
});

const mailOptions = {
  from: 'nodemailtesting1303@gmail.com',
  to: 'nodemailtesting1303@gmail.com',
  subject: 'Birthday Reminder Mail',
  text: `Your Friends bday in few hours `,//`Your Friends ${friendsName} bday in ${hours} hours `
};

cron.schedule('* * * * *', ()=>{

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
})


module.exports = router;

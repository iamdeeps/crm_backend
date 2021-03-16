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
  let googleLoginDetails = jwtDecoder(req.body.credential)
  res.status(200).json({
    message:'login success',
    userData:googleLoginDetails
  })
})

/* Fetch user */
router.get('/fetchUser', async function(req, res, next) {
  Post.find()
  .then((fetchedData)=>{
    res.status(200).json(
      fetchedData
    )
  })
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodemailtesting1303@gmail.com',//env.gmailUser,
    pass: 'Qwerty@12345',//env.gmailPass,
  }
});

cron.schedule('0 0 0 * * *',async ()=>{
  let usersData = await dbData()
  usersData.forEach(function(user, i , array){
    let mailOptions = {
      from: 'nodemailtesting1303@gmail.com',
      subject: 'Birthday Reminder Mail',
      text: `HURRAY!!! Its ${user.name} bday in 24 hours `,
      to:'nodemailtesting1303@gmail.com',
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
})

function dbData(){
  return new Promise(async (resolve,reject)=>{
    try {
      let mailList = []
      Post.find()
      .then((fetchedData)=>{
        for (let i = 0; i < fetchedData.length; i++) {
          const element = fetchedData[i];
          const yesterDay = +new Date().setHours(0,0,0,0) - 8.64e7
          if(element.dateOfBirth && (element.dateOfBirth >= yesterDay) ){
            mailList.push(element)
          }
        }
        resolve(mailList)
      })
    } catch (error) {
        reject(error)
    }
  })
}


module.exports = router;

const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const {handleErrors} = require('./middlewares');
const {
    requireEmail,
    requirePassword,
    requirePassConfirmation,
    requireEmailExists,
    requireValidPasswordForUser
} = require('./validator');

const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}));
})


// const bodyParser = (req,res,next) =>{

//     if (req.method === 'POST'){
//         req.on('data',data =>{
//             const parsed = data.toString('utf8').split('&');
//             console.log(parsed);
//             const formData = {};
    
//             for(let pair of parsed){
//                 const[key,value] = pair.split('=');
//                 formData[key] = value;
    
//             }
//             req.body = formData;
//             next();
//         });
//     }
//     else{
//         next();
//     }


// };



router.post('/signup',
[
 requireEmail,
requirePassword,
requirePassConfirmation
],handleErrors(signupTemplate),
async(req,res)=>{

    const {email,password,passwordConfirmation} = req.body;
    //Create a user in our user repo to represent this person
    const user= await usersRepo.create({email,password});

    req.session.userId = user.id;
    // Store the id of that user inside the users cookie
    console.log(req.body); 

res.redirect('/admin/products');

})

router.get('/signout',(req,res)=>{
    
    req.session = null;
    res.send('You are logged out ');

})

router.get('/signin',(req,res)=>{
    res.send(signinTemplate({}));
});

router.post('/signin',
[
   requireEmailExists,
   requireValidPasswordForUser

],handleErrors(signinTemplate),
async(req,res)=>{

    const {email} = req.body;
    const user = await usersRepo.getOneBy({email});
    req.session.userId = user.id;
    res.redirect('/admin/products');
});

module.exports = router;
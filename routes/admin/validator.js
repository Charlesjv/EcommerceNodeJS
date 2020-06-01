const {check} =  require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid Email')
      .custom(async email=>{
        const existingUser = await usersRepo.getOneBy({email});
            if(existingUser){
                throw new Error('Email in use');
            }
    }),
    requirePassword : check('password')
    .trim()
    .isLength({min: 4,max: 20})
    .withMessage('Must be between 4 and 30 characters'),

    requirePassConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({min: 4,max: 20})
    .withMessage('Must be between 4 and 30 characters')
    .custom((passwordConfirmation,{req})=>{
        if (passwordConfirmation !== req.body.password){
            throw new Error('Password must match');
        }
           else return true;
        
    }),
    
    requireEmailExists:  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async(email)=>{
        const user = await usersRepo.getOneBy({email})
        if(!user){
            throw new Error('Email not found');
        }
    }),

    requireValidPasswordForUser: check('password')
    .trim()
    .custom(async(password,{req})=>{
        
        const user  = await usersRepo.getOneBy({email : req.body.email});
        if(!user){
            throw new Error('Invalid Password');
        }

    const validPassword = await usersRepo.comparePasswords(
        password,
        user.password
    );

    if(!validPassword){
        throw new Error('Invalid Password');
    }
    })
}
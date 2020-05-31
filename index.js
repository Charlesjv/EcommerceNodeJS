const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');




const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
    keys: ['tyuilmnfldsgjldmvld']
}))

app.use(authRouter);

app.listen(3010,()=>{
    console.log('Listening');
})
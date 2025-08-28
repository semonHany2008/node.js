const {app}=require('./index');
const {registerController}=require('./controllers/registerControlller.js')

app.post('/register',registerController)
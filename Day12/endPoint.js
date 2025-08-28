const {app}=require('./index')
const {login}=require('./controllers/loginController');
const {logout}=require('./controllers/logoutController');
const {register}=require('./controllers/registerController');

// app.get('/products')
// app.get('/product/:id')
// app.post('/add-product')
// app.delete('/delete-product')
// app.put('/edit-product/:id')
app.post('/login', login)
app.post('/register', register)
// app.post('/send-OTP')
// app.post('/new-password')
app.post('/logout',logout)
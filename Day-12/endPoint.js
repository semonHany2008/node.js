const {app} = require('./index');
const {login} = require('./controllers/loginController')
const {register} = require('./controllers/registerController')
const {logout} = require('./controllers/logoutController')
const {sendOtp} = require('./controllers/sendOtpController')
const {newPassword} = require('./controllers/newPasswordController') 
const {getProducts} = require('./controllers/getProductsController') 
const {getProduct} = require('./controllers/getProductController') 
const {addProduct} = require('./controllers/addProductController') 
const {deleteProduct} = require('./controllers/deleteProductController') 
const {editProduct} = require('./controllers/editProductController') 



app.post('/login', login)
app.post('/register', register)
app.post('/logout', logout)
app.post('/send-otp',sendOtp)
app.post('/new-password',newPassword)
app.get('/products', getProducts)
app.get('/product/:id', getProduct)
app.post('/add-product', addProduct)
app.delete('/delete-product/:id', deleteProduct)
app.put('/edit-product/:id', editProduct)
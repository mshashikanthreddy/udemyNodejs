const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user; // we are storing the sequelize object so,that we can perform (destroy,create) operations not just a regular js object.
            next();
        })
        .catch(err => console.log(err));
})      // adding middleware to store user details so that we can use any where int the app immediately. it just registers for the incoming requests.



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints : true , onDelete : 'CASCADE' }); // if user delete his/her details are also removed.
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through : CartItem}); // through maintains relation of prodids and cartIds
Product.belongsToMany(Cart , {through : CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through :OrderItem});

// 'sync' syncs our models through the database to create tables,relations.
sequelize
//.sync({force : true })  //drop existing table and create new one
.sync()
.then(result => {
    return User.findByPk(1)
    //console.log(result);
})
.then(user => {
    if(!user) {
        return User.create({ name : 'Max', email : 'max@gmail.com'});
    }
    return user;
})
.then(user => {
    //console.log(user);
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});


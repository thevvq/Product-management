const express = require('express');
const methodOverride = require('method-override');
require('dotenv').config();
const path = require('path');

const flash = require('express-flash');
const session = require("express-session");
const bodyParser = require("body-parser");

// ROUTES
const routeClient = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const loginRoute = require("./routes/auth/login.route");
const registerRoute = require("./routes/auth/register.route");
const cartRoute = require("./routes/client/cart.route");

const systemConfig = require('./config/system');

// DB
const database = require('./config/database');
database.connect();

// Cart Model
const Cart = require("./models/cart.model");

const app = express();
const port = process.env.PORT;



/* ======================================================
   MIDDLEWARE CƠ BẢN
====================================================== */

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SESSION
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 30 * 60 * 1000 } 
    })
);

// FLASH
app.use(flash());



/* ======================================================
   GẮN USER VÀO TEMPLATE
====================================================== */
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});



/* ======================================================
   MINI CART DÙNG MongoDB (KHÔNG DÙNG SESSION)
====================================================== */
app.use(async (req, res, next) => {

    // Nếu chưa đăng nhập → giỏ hàng = 0
    if (!req.session.user) {
        res.locals.cartTotal = 0;
        return next();
    }

    const userId = req.session.user._id;

    try {
        const cart = await Cart.findOne({ userId });

        res.locals.cartTotal = cart
            ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
            : 0;

        next();

    } catch (err) {
        console.log("Mini cart error:", err);
        res.locals.cartTotal = 0;
        next();
    }
});



/* ======================================================
   TEMPLATE + PUBLIC
====================================================== */

// tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.locals.tinyMceKey = process.env.TINYMCE_API_KEY;

// PUG
app.set('views', './views');
app.set('view engine', 'pug');

// Public folder
app.use(express.static('public'));

app.locals.prefixAdmin = systemConfig.prefixAdmin;



/* ======================================================
   ROUTES
====================================================== */

app.use("/login", loginRoute);
app.use("/register", registerRoute);

// ⭐ CART MUST GO BEFORE CLIENT ROUTES
app.use("/cart", cartRoute);

// Client + Admin
routeClient(app);
routeAdmin(app);



/* ======================================================
   RUN SERVER
====================================================== */

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

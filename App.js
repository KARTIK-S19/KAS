process.env.NODE_ENV = "development";
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");
const collectionRouter = require("./routes/collectionsRouter");
const flash = require("connect-flash");
const expressSession = require("express-session");
require('dotenv').config();

const db = require("./config/mongoose-connection");
const session = require('express-session');

app.set("view engine", "ejs");
app.use(flash());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/collection", collectionRouter );
app.use("/owners", ownersRouter);
app.use("/users", usersRouter );
app.use("/products", productsRouter);
app.use("/", indexRouter);


app.listen(3000);
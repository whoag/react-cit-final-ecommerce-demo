import connectDB from './config/db.mjs'
import userRoutes from './routes/userRoutes.mjs'
import express from 'express'
import dotenv  from 'dotenv'
import bodyParser from "body-parser";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import wishlistRoutes from "./routes/wishlistRoutes.mjs";
import passport from "passport";
import bcrypt from 'bcrypt'
import './config/passport.mjs'
import User from "./models/usersModel.mjs";
import cors from 'cors'
import multer from 'multer'
import Product from "./models/productModel.mjs";
import path from 'path';
import * as fs from "fs";
import {GridFsStorage} from "multer-gridfs-storage";
//connect database
connectDB()


//dotenv config
dotenv.config()

const app = express()
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const storage = new GridFsStorage({
    url: "mongodb+srv://admin:Abezm5Buw1PwRuxU@cluster0.qas53.mongodb.net/wantThis",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "products",
            filename: `${file.originalname}`,
            metadata: req.body.slug
        };
    }
});
//upload params for multer
const upload = multer({ storage: storage });

//Creating API for user
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/wishlist', wishlistRoutes)

const __dirname = path.resolve(path.dirname(''));

app.post('/api/products', upload.single('image'), async (req, res)=>{
    console.log(req.file.buffer)
    let slug = req.body.name.replace(" ", "-").toLowerCase()
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        slug: slug,
        price: req.body.price,
        category_id: req.body.category_id,
    });
    product
        .save()
        .catch(err => console.log(err));

    Product.findOne({slug: slug})
})
app.post('/api/register', jsonParser, function (req, res)  {
    console.log(req.body)
    // Form validationconst { errors, isValid } = validateRegisterInput(req.body);// Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    if(req.body.password !== req.body.checkPassword){
        return res.status(400).json({ error: "Passwords do not match" });
    }else{
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({ error: "Email already exists" });
            } else {
                const newUser = new User({
                    firstName: req.body.fName,
                    lastName: req.body.lName,
                    email: req.body.email,
                    password: req.body.password,
                    admin: false,
                    wishlist_ids: [],
                });// Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }

});

app.post('/api/login', jsonParser,(req, res) => {
    //  const validationconst = validateLoginInput(req);// Check validation
    // if (!validationconst.isValid) {
    //     return res.status(400).json(validationconst.errors);
    // }
    const email = req.body.email;
    const password = req.body.password;// Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                return res
                    .status(200).json({user})

            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
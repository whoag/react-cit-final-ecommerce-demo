import { getUsers, getUserById } from "../controllers/userController.mjs";
import express from 'express'
import User from "../models/usersModel.mjs";
const router = express.Router()

router.route('/register').post( (req, res) => {
    // Form validationconst { errors, isValid } = validateRegisterInput(req.body);// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
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
});
// express router method to create route for getting all users
router.route('/').get(getUsers)

// express router method to create route for getting users by id
router.route('/:id').get(getUserById)

export default router
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = decoded.id;
        next();
    });
};

//Register New User deleted the previous line of code.
//Route to create a new user.
router.post('/', (req, res) => {
    const { username, password, fullname, gender, address } = req.body;
    const newUser = new User({ username, password, fullname, gender, address });

    newUser.save()
        .then(user => {
            // Generate a JWT token
            const token = jwt.sign({ id: user._id }, 'secretKey');
            res.json({ token });
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// Route to log in a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid credentials' });
                    }

                    // Generate a JWT token
                    const token = jwt.sign({ id: user._id }, 'secretKey');
                    res.json({ message: 'Logged in successfully', token });
                });
        })
        .catch(err => res.status(500).json({ message: err.message }));
});



router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Protected route' });
});

//DISPLAY USERS
router.get('/', async(req,res) => {
    try{
           const users = await User.find()
           res.json(users)
    }catch(err){
        res.send('Error ' + err)
    }
});

//Search my exact characters
router.get('/search', async(req,res)=>{
    const query = req.query.q;
    try{
        const user = await
        User.findOne({username: query});
        res.json(user);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//Search by letters
router.get('/lookup/:query',async (req,res)=>{
    const query = req.params.query.toLowerCase();
    try{
        const user = await User.find({username :{
            $regex: new RegExp(query, 'i')
        }});
        res.json(user);
    }
        catch(err){
            res.status(500).json({message: err.message});
        }  
});

//DELETE ID
router.delete('/delete/:id', async(req,res)=>{
    try{
        const deletedUser = await
        User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User has been Deleted! Gago', user:deletedUser});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//UPDATE
router.patch('/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
            password: req.body.password,
            fullname: req.body.fullname,
            gender: req.body.gender,
            address: req.body.address
        },{new:true})
        res.json({user:user, message:'User has been updated'})
    }
    catch(err){
        res.send('Error')
    }
});

//AUTHORIZATION

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid credentials' });
                    }

                    // Generate a JWT token
                    const token = jwt.sign({ id: user._id }, 'secretKey');
                    res.json({ token });
                });
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router
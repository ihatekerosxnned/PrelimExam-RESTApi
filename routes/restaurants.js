const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')


router.get('/', async(req,res) => {
    try{
           const restaurants = await Restaurant.find()
           res.json(restaurants)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const restaurants = new Restaurant({
        name:req.body.name,
        location:req.body.location,
        owner_name: req.body.owner_name
    })
    try{
        const a1 =  await restaurants.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.get('/search', async(req,res)=>{
    const query = req.query.q;
    try{
        const restaurants = await
        Restaurant.findOne({name: query});
        res.json(restaurants);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/lookup/:query',async (req,res)=>{
    const query = req.params.query.toLowerCase();
    try{
        const restaurants = await Restaurant.find({name :{
            $regex: new RegExp(query, 'i')
        }});
        res.json(restaurants);
    }
        catch(err){
            res.status(500).json({message: err.message});
        }  
})

router.delete('/delete/:id', async(req,res)=>{
    try{
        const deletedRestaurant = await
        Restaurant.findByIdAndDelete(req.params.id);
        if(!deletedRestaurant){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User has been Deleted! Gago', restaurant:deletedRestaurant});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router
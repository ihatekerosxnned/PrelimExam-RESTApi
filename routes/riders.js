const express = require('express')
const router = express.Router()
const Rider = require('../models/rider')


router.get('/', async(req,res) => {
    try{
           const rider = await Rider.find()
           res.json(rider)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const rider = new Rider({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        gender:req.body.gender,
        age:req.body.age,
        datecreated: req.body.datecreated
    })
    try{
        const a1 =  await rider.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.get('/search', async(req,res)=>{
    const query = req.query.q;
    try{
        const rider = await
        Rider.findOne({first_name: query});
        res.json(rider);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/lookup/:query',async (req,res)=>{
    const query = req.params.query.toLowerCase();
    try{
        const rider = await Rider.find({first_name :{
            $regex: new RegExp(query, 'i')
        }});
        res.json(rider);
    }
        catch(err){
            res.status(500).json({message: err.message});
        }  
})

router.delete('/delete/:id', async(req,res)=>{
    try{
        const deletedRider = await
        Rider.findByIdAndDelete(req.params.id);
        if(!deletedRider){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User has been Deleted! Gago', rider:deletedRider});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router
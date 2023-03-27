const express = require('express')
const router = express.Router()
const Menu = require('../models/menu')


router.get('/', async(req,res) => {
    try{
           const menus = await Menu.find()
           res.json(menus)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const menus = new Menu({
        prodname:req.body.prodname,
        category:req.body.category,
        description: req.body.name,
        amount: req.body.amount,
        restaurantid: req.body.restaurantid
    })
    try{
        const a1 =  await menus.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.get('/search', async(req,res)=>{
    const query = req.query.q;
    try{
        const menus = await
        Menu.findOne({prodname: query});
        res.json(menus);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/lookup/:query',async (req,res)=>{
    const query = req.params.query.toLowerCase();
    try{
        const menus = await Menu.find({prodname :{
            $regex: new RegExp(query, 'i')
        }});
        res.json(menus);
    }
        catch(err){
            res.status(500).json({message: err.message});
        }  
})

router.delete('/delete/:id', async(req,res)=>{
    try{
        const deletedMenu = await
        User.findByIdAndDelete(req.params.id);
        if(!deletedMenu){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User has been Deleted! Gago', menu:deletedMenu});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router
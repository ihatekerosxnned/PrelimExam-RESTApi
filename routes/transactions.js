const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')


router.get('/', async(req,res) => {
    try{
           const transaction = await Transaction.find()
           res.json(transaction)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req,res) => {
    const transaction = new Transaction({
        userid:req.body.userid,
        riderid:req.body.riderid,
        restaurantid:req.body.restaurantid,
        menuid:req.body.menuid,
        total:req.body.total,
        trans_date:req.body.trans_date
    })
    try{
        const a1 =  await transaction.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.get('/search', async(req,res)=>{
    const query = req.query.q;
    try{
        const transaction = await
        Transaction.findOne({userid: query});
        res.json(transaction);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/lookup/:query',async (req,res)=>{
    const query = req.params.query.toLowerCase();
    try{
        const transaction = await Transaction.find({userid :{
            $regex: new RegExp(query, 'i')
        }});
        res.json(transaction);
    }
        catch(err){
            res.status(500).json({message: err.message});
        }  
})

router.delete('/delete/:id', async(req,res)=>{
    try{
        const deletedTransaction = await
        Transaction.findByIdAndDelete(req.params.id);
        if(!deletedTransaction){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User has been Deleted! Gago', transaction:deletedTransaction});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.patch('/:id', async(req,res)=>{
    try{
        const transaction = await Transaction.findByIdAndUpdate(req.params.id,{
            riderid:req.body.riderid,
            restaurantid:req.body.amount,
            menuid:req.body.trans_date,
            total:req.body.total,
            trans_date:req.body.trans_date
        },{new:true})
        res.json({transaction:transaction, message:'Transaction has been updated'})
    }
    catch(err){
        res.send('Error')
    }
});


module.exports = router
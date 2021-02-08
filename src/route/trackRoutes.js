const mongoose = require('mongoose');
const express = require('express');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();
router.use(requireAuth);

router.get('/tracks', async(req,res) => {
    const tracks = await Track.find({userId : req.user._id});
 // in this we are checking the userid is valid or not
    res.send(tracks);
});

router.post('/tracks',async(req,res) => {
   const {name,location} = req.body;
    if (!name || !location){
        return res.status(422).send({error:'You must provide name and location'});
    }
    try{
    const track = new Track({name,location,userId: req.user._id });
    await track.save();
    res.send(track);
    } catch(err){   // if user input wrong location
        res.status(422).send({error:err.message});
    }
});

module.exports = router;
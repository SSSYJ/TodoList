const express = require('express');
const router = express.Router();

// List Model 
const List = require('../models/List');

// GET All lists
router.get('/', (req, res) => {
    List.find((err, foundLists) => {
        if (err){
            console.log(err);
        }else{
            res.json(foundLists);
        }
    })
})

// GET ONE List 
router.get('/:id', (req, res) => {
    const id = req.params.id;
    List.findById({_id: id}, (err, foundList) => {
        if (err){
            console.log(err);
        }else{
            res.json(foundList);
        }
    })
})


// POST
router.post('/', (req, res) => {
    const newList = new List({
        title: "New List",
        tasks: req.body.tasks,
        date: new Date()
    });

    newList.save((err) => {
        if(err){
            res.json({success: false, err: err});
        }else{
            res.json(newList);
        }
    });
})

// UPDATE
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    List.updateOne(
        {_id: id},
        {$set: req.body},
        err => {
            if(err){
                res.json({success: false, err: err});
            }else{
                res.json({_id:id, ...req.body});
            }
        }
    )
})


// DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    List.findByIdAndRemove(id, (err) => {
        if (err){
            res.json({success: false, err: err});
        } else{
            res.json({success: true});
        }
    })
})

module.exports = router;
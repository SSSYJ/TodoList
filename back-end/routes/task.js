const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Task Model 
const Task = require('../models/Task');
const List = require('../models/List');


// GET 
router.get('/:list_id', (req, res) => {
    const listId = req.params.list_id;
    List.findById({_id: listId}, (err, foundList) => {
        if (err){
            console.log(err);
        }else{
            res.json(foundList.tasks);
        }
    })
})

// POST
router.post('/:list_id', (req, res) => {
    const listId = req.params.list_id;
    const newTask = new Task({
        content: req.body.content
    });

    List.findById({_id: listId}, (err, foundList) => {
        if (err){
            console.log(err);
        }else{
            foundList.tasks.push(newTask);
            foundList.save((err) => {
                if(err){
                    res.json({success: false, err: err});
                }else{
                    res.json(newTask);
                }
            });
        }
    })
})

// UPDATE
router.patch('/:list_id/:task_id', (req, res) => {
    const listId = req.params.list_id;
    const taskId = req.params.task_id;
    List.updateOne(
        {_id: listId}, 
        {$set: {"tasks.$[elem].content":req.body.content}}, 
        {arrayFilters:[{'elem._id': new ObjectId(taskId)}]},
        err => {
            if(err){
                res.json({success: false, err: err});
            }else{
                res.json({_id: taskId, content: req.body.content});
            }
        }
    ) 
})


// DELETE
router.delete('/:list_id/:task_id', (req, res) => {
    const listId = req.params.list_id;
    const taskId = req.params.task_id;

    List.updateOne(
        {_id: listId}, 
        {$pull: {"tasks":{"_id": new ObjectId(taskId)}}},
        err => {
            if(err){
                res.json({success: false, err: err});
            }else{
                res.json({_id: taskId, content: req.body.content});
            }
        })
})

module.exports = router;
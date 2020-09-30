const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const task = require('./routes/task');
const list = require('./routes/list');
app.use("/api/tasks", task);
app.use("/api/lists", list);


mongoose.connect("mongodb://localhost:27017/tasksDB", {useNewUrlParser:true, useUnifiedTopology:true});



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
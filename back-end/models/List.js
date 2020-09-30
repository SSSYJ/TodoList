const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true},
    date: Date,
    tasks: []
})

const List = mongoose.model("List", listSchema);

if (List.length === 0) {
    const todayList = new List({
        title: "Today",
        date: new Date(),
        tasks:[]
    })
    todayList.save();
}



module.exports = List;
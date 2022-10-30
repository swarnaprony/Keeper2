const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();

app.use(express.json());

app.use(
    cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000']})
  );

mongoose.connect("mongodb+srv://admin-swarna:eENsnPzypRAZ0OlT@cluster0.alvs2jv.mongodb.net/KeepDB");

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Note = mongoose.model("Note", noteSchema);

app.route("/notes")

.get(function(req, res){
    Note.find(function(err, foundNotes){
        if(!err) {
            res.send(foundNotes);
        } else {
            res.send(err);
        }
    })
})

.post(function (req, res){
    console.log(req.body)
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });

    newNote.save(function(err){
        if(!err) {
            res.send(newNote);
        } else {
            res.send(err);
        }
    });

});

app.route("/notes/:noteId")

.get(function(req,res){
    Note.findOne({_id: req.params.noteId}, 
        function(err, note) {
            if(!err) {
                res.send(note);
            } else {
                res.send(err);
            }
    })

})

.delete(function(req, res){
    Note.deleteOne(
        {_id: req.params.noteId},
        function(err) {
            if(!err){
                res.send("Successfully Deleted");
            } else {
                res.send(err);
            }
        }
    )
})

.put(function(req, res){
    Note.updateOne(
        {_id: req.params.noteId},
        {title: req.body.title, content: req.body.content},
        function(err){
            if (!err) {
                res.send("Note Updated");
            } else {
                console.log("Note deleted")
                res.send(err);
            }
        }
    )
})

.patch(function(req, res){
    Note.updateOne(
        {_id: req.params.noteId},
        {$set: req.body},
        function(err){
            if (!err) {
                res.send("Note Updated");
            } else {
                res.send(err);
            }
        }
    )
})


app.listen(9000, function(){
    console.log("Server started on port 9000")
});
#Modified
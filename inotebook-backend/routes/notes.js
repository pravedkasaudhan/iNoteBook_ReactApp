const express = require("express");
const router = express.Router();
const fetchdata = require("../Middleware/fetchdata")
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//Route 1:- Get all notes for the specific user as per the auth-token. Login Required
router.get("/fetchAllNotes", fetchdata, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(502).send("INTERNAL SERVER ERROR");
    }
    // res.json([{id:"praved"}]);
});

//ROute 2:- Enter the data in notes of specific user; Login required

router.post("/addnote",fetchdata,
[
    body('title', "enter the title of min 5 charatcers").isLength({ min: 5 }),
    body('description', "enter the valid length description").isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            // console.log(req.body);
            const {title,description,tag}=req.body;
            //if there are errors return bad error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note=new Notes(
                {title,description,tag,user:req.user.id}
                );
                const notesave=await note.save();
                res.send(note)
            } catch (error) {
                console.log(error.message);
                res.status(502).send("INTERNAL SERVER ERROR");
            }
            })


//Route 3 :- Update any note for any user . login required
router.put("/updatenote/:id",fetchdata, async(req,res)=>{
    try {
        
        const {title,description,tag}=req.body;
        
        //create new Note
        const newNote={}
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        
        //find the note to be updated
        let note= await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("NOT FOUND")};
        
        if(note.user.toString() !== req.user.id){
            res.status(400).send("NOT ALLOWED");
        }
        
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note);
    }catch (error) {
        console.log(error.message);
        res.status(502).send("INTERNAL SERVER ERROR");
    }
})

//Route 4 :- Delete any note for any user . login required
router.put("/deletenote/:id",fetchdata, async(req,res)=>{
    try {
        
        const {title,description,tag}=req.body;
        
        
        
        //find the note to be updated
        let note= await Notes.findById(req.params.id);
        if(!note){ return res.status(404).send("NOT FOUND")};
        
        //validate the user
        if(note.user.toString() !== req.user.id){
            res.status(400).send("NOT ALLOWED");
        }
        
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({Success:"NOTE SUCCESSFULLY DELETED"});
    } catch (error) {
        console.log(error.message);
        res.status(502).send("INTERNAL SERVER ERROR");
    }
})
module.exports = router
const Note=require('../models/Notes')
const jwt=require('jsonwebtoken')



const getNotes=async (req,res)=>{
    try {
    const notes=await Note.find({user:req.user._id}).sort({createdAt:-1});
    
    res.status(200).json({
      message: 'Notes Fetched SuccessFully',
      notes,
    })
    } catch (error) {
        res.status(500).json({
            message:'Server error',
            error:error.message
        })
    }
}

const getNoteDetail = async (req, res) => {
  try {
    const noteDetail = await Note.findOne({_id:req.praram.id,user:req.user._d });
    
    if (!noteDetail) {
      return res.status(404).json({ message: 'Note not found' })
    }
    res.status(200).json({
      message: 'Note Fetched SuccessFully',
      noteDetail,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    })
  }
}

const createNote = async (req, res) => {
  try {
    const {title,content,tags} =req.body;
    
    const note=await Note.create({
        title,
        content,
        tags:tags ||[],
        user:req.user._id
    })
    res.status(201).json({
        message:'Note Created SuccessFully',
        note
    });
    
  } catch (error) {
    console.log({error})
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    })
  }
}

const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body

    const note = await Note.findOne({
      _id:req.params.id,
      user:req.user._id
    })

    if(!note){
        return res.status(404).json({message:'Note Not Found'})
    }
    const updateNote=await Note.findByIdAndUpdate(note._id,{
        title:title || note.title,
        content:content || note.content, 
        tags:tags || note.tags 
    },{
        runValidators:true,
        new:true
    })
    res.status(200).json({
      message: 'Note Updated SuccessFully',
      updateNote,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    })
  }
}
const deleteNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!note) {
      return res.status(404).json({ message: 'Note Not Found' })
    }
    const deletedNote = await Note.findByIdAndDelete(note._id)
    res.status(201).json({
      message: 'Note Deleted SuccessFully',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    })
  }
}

module.exports={
   getNotes,
   getNoteDetail,
   createNote,
   updateNote,
   deleteNote
}
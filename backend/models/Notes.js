const { default: mongoose } = require('mongoose')

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [60, 'Title Cannot exceed more then 60 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxlength: [3000, 'Content Cannot exceed more then 60 characters'],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [20, 'Content Cannot exceed more then 20 characters'],
      },
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
  },
  {
    timestamps: true,
  }
)

const NotesModel = mongoose.model('Notes', notesSchema)
module.exports = NotesModel

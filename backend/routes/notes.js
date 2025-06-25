const express = require('express')
const router = express.Router()
const { getNotes,getNoteDetail,createNote,updateNote,deleteNote } = require('./../controllers/notes')

router.get('/', getNotes)
router.post('/', createNote)
router.get('/:id', getNoteDetail)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router

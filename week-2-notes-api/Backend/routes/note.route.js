const express=require('express');
const noteRouter=express.Router();

const { createNote,editNote, allNotes,userNotes,deleteNotes,updateIsPinned } = require('../controllers/note.controller');

const authUser=require('../middlewares/user.auth');

// to send something on the server
noteRouter.post('/add-note',createNote);
// to update the data on the server
noteRouter.put('/edit-note/:noteId',authUser,editNote);
noteRouter.put('/ispinned/:noteId',authUser,updateIsPinned);
noteRouter.get('/fetch-note',allNotes);
// to fetch the data
noteRouter.get('/fetch/user-notes',authUser,userNotes);
//
noteRouter.delete('/delete-notes/:noteId',authUser,deleteNotes);

module.exports=noteRouter;
const noteModel = require("../models/notes.model");

const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    //const userId = req.user._id;

   // if (!userId) return res.json({ error: true, message: "No user Found" });
    if (!content || !title)
      return res.json({
        error: true,
        message: "Make sure to add Content with Title",
      });

    const note = new noteModel({
      
      title,
      content,
      tags: tags || [],
    });
    await note.save();
    return res.json({
      error: false,
      message: "A new note is created",
      note: note,
    });
  } catch (error) {
    console.log("Error in creating note", error);
    return res.json({ error: true, message: "Failed to add Note" });
  }
};

const editNote = async (req, res) => {
  try {
    const { title, content, tags, isPinned } = req.body;
    const userId = req.user._id;
    const { noteId } = req.params;

    const note = await noteModel.findById(noteId);
    if (!noteId)
      return res.json({ error: true, message: "Couldnot found the note" });

    if (note.updatedAt.getDate() === new Date().getDate())
      return res.json({
        error: true,
        message: "Updatation can be done after 24 hr",
      });

    if (note.userId == userId) {
      (note.title = title || note.title),
        (note.content = content || note.content),
        (note.tags = tags || note.tags),
        (note.isPinned = isPinned || note.isPinned);
      await note.save();

      return res.json({
        error: false,
        message: "Updation of Note succeed",
        note,
      });
    } else
      return res.json({ error: true, message: "Not able to edit the note" });
  } catch (error) {
    console.log("Error in editNote", error);
    return res.json({ error: true, message: "Failed to edit Note" });
  }
};

const allNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({});

    if (!notes.length)
      return res.json({ error: true, message: "No notes found" });
    return res.json({ error: false, notes });
  } catch (error) {
    console.log("Error in fetching notes", error);
    return res.json({ error: true, message: "Failed to find notes" });
  }
};

const userNotes = async (req, res) => {
  try {
    const notes = await noteModel
      .find({ userId: req.user._id })
      .sort({ createdAt: 1 });

    if (!notes.length)
      return res.json({ error: true, message: "No notes found" });

    return res.json({ error: false, notes });
  } catch (error) {
    console.log("Error in userNotes", error);
    return res.json({ error: true, message: "Failed to Fetch notes" });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { noteId } = req.params;

    const notes = await noteModel.find({ _id: noteId, userId: req.user._id });

    if (notes) {
      await noteModel.deleteOne({ _id: noteId, userId: req.user._id });
      return res.json({ error: false, message: "Note Deleted" });
    } else return res.json({ error: true, message: "No notes Found" });
  } catch (error) {
    console.log("Error in deleting notes", error);
    return res.json({ error: true, message: "Failed to delete notes" });
  }
};

const updateIsPinned = async (req, res) => {
  try {
    const { isPinned } = req.body;
    const userId = req.user._id;
    const { noteId } = req.params;

    const note = await noteModel.findById(noteId);
    if (!noteId)
      return res.json({ error: true, message: "Couldnot found the note" });

    if (note.updatedAt.getDate() === new Date().getDate())
      return res.json({
        error: true,
        message: "Updatation can be done after 24 hr",
      });

    if (note.userId == userId) {
      note.isPinned = isPinned || note.isPinned;
      await note.save();

      return res.json({
        error: false,
        message: "Updation of Note succeed",
        note,
      });
    } else
      return res.json({ error: true, message: "Not able to edit the note" });
  } catch (error) {
    console.log("Error in pinned function", error);
    return res.json({ error: true, message: "Failed to edit Note" });
  }
};


module.exports = {
  createNote,
  editNote,
  allNotes,
  userNotes,
  deleteNotes,
  updateIsPinned,
};

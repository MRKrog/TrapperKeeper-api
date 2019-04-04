const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid');
app.use(express.json());
app.use(cors());

app.locals.notes = [
  { id: shortid.generate(),
    title: 'Worf ToDo',
    list: [
      { id: shortid.generate(), 
        text: 'Eat food', 
        isComplete: false 
      },
    ]
  },
  { id: shortid.generate(),
    title: 'Jake ToDo',
    list: [
      { id: shortid.generate(), 
        text: 'Do basic styling', 
        isComplete: false 
      },
    ]
  },
];

const sendStatus = (response, code, message) => {
 response.status(code).json(message)
}

app.get('/api/v1/notes', (request, response) => {
 sendStatus(response, 200, app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
  const { notes } = app.locals;
  const { title } = request.body;

  if (!title) return sendStatus(response, 422, 'Title is required');

  const note = { 
    id: shortid.generate(), 
    title, 
    list: [] 
  }
  notes.push(note);
  return response.status(201).json(note);
  });

app.put('/api/v1/notes/:id', (request, response) => {
  const { title } = request.body;
  const { id } = request.params;
  const { notes } = app.locals;

  let noteFound;
  let noteIndex;

  notes.map((note, index) => {
    if (note.id == id) {
      noteFound = note;
      noteIndex = index;
    }
  });

  if(!noteFound) return sendStatus(response, 404, 'Note was not found');
  if(!title) return sendStatus(response, 400, 'Title is required');

  const updatedNote = {
    id: noteFound.id,
    title: request.body.title || noteFound.title,
  };

  notes.splice(noteIndex, 1, updatedNote);
  return sendStatus(response, 200, 'Note updated successfully');
});

app.get('/api/v1/notes/:id', (request, response) => {
 const noteById = app.locals.notes.find(note => request.params.id == note.id);
 if(!noteById) return sendStatus(response, 404, 'Note was not found');
 sendStatus(response, 200, noteById);
})

app.delete('/api/v1/notes/:id', (request, response) => {
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);
  if (noteIndex === -1) return response.status(404).json('Note not found');
  app.locals.notes.splice(noteIndex, 1);
  return sendStatus(response, 200, 'Note was successfully deleted');
})

export default app;
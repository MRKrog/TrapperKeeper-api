const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid');
app.use(express.json());
app.use(cors());

app.locals.notes = [
  { id: 12345, name: 'worf', type: 'cat' },
  { id: 23456, name: 'Jake', type: 'coolerCat' },
]

app.get('/api/v1/notes', (request, response) => {
 response.status(200).json(app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
 const { notes } = app.locals;
 const { name, type } = request.body;

 if(!name && !type) return send422(response, 'Name and Type is required')
 if(!name) return send422(response, 'Name is required')
 if(!type) return send422(response, 'Type is required')

 const note = { id: shortid.generate(), name, type }

 notes.push(note);
 return response.status(201).json(note);
});

app.put('/api/v1/notes/:id', (request, response) => {
 const { name, type } = request.body;
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

 if(!noteFound) return send400(response, 'Note is not found')
 if(!name) return send400(response, 'Name is required')
 if(!type) return send400(response, 'Type is required')

 const updatedNote = {
  id: noteFound.id,
  name: request.body.name || noteFound.name,
  type: request.body.type || noteFound.type,
 };

 notes.splice(noteIndex, 1, updatedNote);
 return send200(response, 'Note added successfully')
});

const send200 = (response, message) => {
 response.status(200).json(message)
}

const send201 = (response, message) => {
 response.status(201).json(message)
}

const send422 = (response, message) => {
 response.status(422).json(message)
}

const send404 = (response, message) => {
 response.status(404).json(message)
}

app.get('/api/v1/notes/:id', (request, response) => {
 const noteById = app.locals.notes.find(note => request.params.id == note.id)
 if(!noteById) return send404("Note not found")
 response.status(200).json(noteById)
})

app.delete('/api/v1/notes/:id', (request, response) => {
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);
  if (noteIndex === -1) return response.status(404).json('Note not found');
  app.locals.notes.splice(noteIndex, 1);
  return response.status(200).json('Note was successfully deleted');
})

export default app;
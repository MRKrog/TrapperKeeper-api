const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid');
app.use(express.json());
app.use(cors());

app.locals.notes = [
  { id: shortid.generate(),
    title: 'Evaluation To-Do',
    list: [
      { id: shortid.generate(),
        text: 'Weep with joy at our success',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Applaud and bow',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Give us perfect scores on everything',
        isComplete: false
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
  { id: shortid.generate(),
    title: 'Team To-Do',
    list: [
      { id: shortid.generate(),
        text: 'Show project at demo night',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Get jobs',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Keep nailing it',
        isComplete: false
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
];

const sendMessage = (response, code, message) => {
 return response.status(code).json(message)
}

app.get('/api/v1/notes', (request, response) => {
 sendMessage(response, 200, app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
  const { notes } = app.locals;
  const { title, list } = request.body;

  if (!title) return sendMessage(response, 422, 'Title is required');

  const note = {
    id: shortid.generate(),
    title,
    list
  }
  notes.push(note);
  return response.status(201).json(note);
  });

app.put('/api/v1/notes/:id', (request, response) => {
  const { title, list } = request.body;
  const { id } = request.params;
  const { notes } = app.locals;

  let found = false;
  const newNotes = notes.map(note => {
    if (note.id == id) {
      found = true;
      return {
        id,
        title: title || note.title,
        list: list || note.list,
      }
    } else {
      return note
    }
  });
  if(!found) return sendMessage(response, 404, 'Note was not found');
  if(!title) return sendMessage(response, 400, 'Title is required');
  app.locals.notes = newNotes;

  return sendMessage(response, 200, 'Note updated successfully');
});

app.get('/api/v1/notes/:id', (request, response) => {
 const noteById = app.locals.notes.find(note => request.params.id == note.id);
 if(!noteById) return sendMessage(response, 404, 'Note was not found');
 sendMessage(response, 200, noteById);
})

app.delete('/api/v1/notes/:id', (request, response) => {
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);
  if (noteIndex === -1) return response.status(404).json('Note not found');
  app.locals.notes.splice(noteIndex, 1);
  return sendMessage(response, 200, 'Note was successfully deleted');
})

export default app;
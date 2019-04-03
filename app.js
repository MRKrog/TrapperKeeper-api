const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid');
app.use(express.json());
app.use(cors());

app.locals.notes = [
  { id: 12345, name: 'worf', type: 'cat' },
  { id: 23456, name: 'dave', type: 'dog' }
]

app.get('/api/v1/notes', (request, response) => {
  response.status(200).json(app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
  if (!request.body.type && !request.body.name) {
    return response.status(422).send({
      success: 'false',
      message: 'name & type is required'
    });
  } else if (!request.body.name) {
    return response.status(422).send({
      success: 'false',
      message: 'name is required'
    });
  } else if (!request.body.type) {
    return response.status(422).send({
      success: 'false',
      message: 'type is required'
    });
  } else if (request.body.type && request.body.name) {
    const note = {
      id: shortid.generate(),
      name: request.body.name,
      type: request.body.type
    }
    app.locals.notes.push(note);
    return response.status(201).json(note);
  }
});

app.get('/api/v1/notes/:id', (request, response) => {
  const noteById = app.locals.notes.find(note => request.params.id == note.id)
  if(!noteById) return response.sendStatus(404)
  response.status(200).json(noteById)
})

export default app;
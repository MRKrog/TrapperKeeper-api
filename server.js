const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid');
app.use(express.json());
app.use(cors());

app.locals.notes = [
  { id: 12345, name: 'worf', type: 'cat' }
]

app.listen('3001', () => {
  console.log('Server is now running at http://localhost:3001');
})

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

const express = require('express');
const app = express();
const cors = require('cors')
// const shortid = require('shortid');
app.use(express.json())
app.use(cors());

app.locals.notes = [
  { id: 12345, name: 'worf', type: 'cat' }
]

app.listen('3001', () => {
  console.log('Server is now running at http://localhost:3001');
})

app.get('/api/v1/notes', (request, response) => {
  // response.send('Hello World!')
  response.status(200).json(app.locals.notes);
})

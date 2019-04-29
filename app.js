// add express module
const express = require('express');
// create an express application called app
const app = express();
// add cors module
const cors = require('cors');
// add shortid module to generate ids for notes
const shortid = require('shortid');
// app should parse request body to json
app.use(express.json());
// configure cors
app.use(cors());

// mock data to give to the user
app.locals.notes = [
  { id: shortid.generate(),
    title: 'Evaluation To-Do',
    background: '#ffe680',
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
    background: '#ffe680',
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
        isComplete: true
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
  { id: shortid.generate(),
    title: 'Shopping List',
    background: '#eef5db',
    list: [
      { id: shortid.generate(),
        text: 'Apples',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Carrots',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Bread',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Milk',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Beer',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Vanilla',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Oats',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Pom Seeds',
        isComplete: true
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
  { id: shortid.generate(),
    title: 'Supplies for Birthday Party',
    background: '#d6ffb7',
    list: [
      { id: shortid.generate(),
        text: 'Balloons',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Cake',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Party Hats',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Pinata',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Streamers',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Chairs',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Cups',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Tables',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Unicorn Candles',
        isComplete: true
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
  { id: shortid.generate(),
    title: 'How to Make Toast',
    background: '#eef5db',
    list: [
      { id: shortid.generate(),
        text: 'Get a job so you can buy a toaster',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Buy a toaster',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Buy bread',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Put bread in toaster for 2 mins',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Remove bread from toaster when golden brown',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Spread small pad of butter on toast',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Enjoy!',
        isComplete: false
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
  { id: shortid.generate(),
    title: 'Archie ToDo Daily',
    background: '#d6ffb7',
    list: [
      { id: shortid.generate(),
        text: 'Eat Breakfast',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Play with Finn',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Poop',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Pee',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Chew on bone',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Eat Dinner',
        isComplete: false
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
  { id: shortid.generate(),
    title: 'Job Prep',
    background: '#ffe680',
    list: [
      { id: shortid.generate(),
        text: 'Start Resume',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Send resume to Brenna for review',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Update LinkedIn',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Go on Job Shadow',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Warm Outreach',
        isComplete: true
      },
      { id: shortid.generate(),
        text: 'Beer date with Gabi',
        isComplete: false
      },
      { id: shortid.generate(),
        text: 'Apply for jobs',
        isComplete: false
      },
      { id: shortid.generate(),
        text: '',
        isComplete: false
      },
    ]
  },
];

// method for returning response status codes 
const sendMessage = (response, code, message) => {
 return response.status(code).json(message)
}

// lets you retrive all notes above
app.get('/api/v1/notes', (request, response) => {
// if a get request is successful the sendMessage is invoked,
// the status code will be 200 send the array of notes as the body
 sendMessage(response, 200, app.locals.notes);
});

// lets you push up a new note onto the existing array above
app.post('/api/v1/notes', (request, response) => {
// clean up code by destructuring the array
  const { notes } = app.locals;
// destructure the body
  const { title, list, background } = request.body;
// this is our error handling checking if the title doesnt exist
  if (!title) return sendMessage(response, 422, 'Title is required');
// declaring the new note to prepare for push
  const note = {
    id: shortid.generate(),
    background,
    title,
    list
  }
// push new note onto app.locals
  notes.push(note);
// sends status code to user
  return response.status(201).json(note);
  });

// lets you overwrite existing note targeted by id
app.put('/api/v1/notes/:id', (request, response) => {
// destructure the body
  const { title, list, background } = request.body;
// destructure id from request.params
  const { id } = request.params;
// clean up code by destructuring the array
  const { notes } = app.locals;
// declare variable to utilize down below
  let found = false;
// set new variable mapping over the notes
  const newNotes = notes.map(note => {
// checking if our note is found
    if (note.id == id) {
// re-assigning the variable to true
      found = true;
// returns a new note to take place of the previous one
      return {
        id,
        background: background || note.background,
        title: title || note.title,
        list: list || note.list,
      }
    } else {
// returns original note 
      return note
    }
  });
// sends error message back if the note wasnt found
  if(!found) return sendMessage(response, 404, 'Note was not found');
// sends error message back if the title wasnt received
  if(!title) return sendMessage(response, 400, 'Title is required');
// assigns current notes to new re-assigned notes
  app.locals.notes = newNotes;
// lets user note with message if successful
  return sendMessage(response, 200, 'Note updated successfully');
});

// lets you retrieve a specific note from array above
app.get('/api/v1/notes/:id', (request, response) => {
// declares note found by id
 const noteById = app.locals.notes.find(note => request.params.id == note.id);
// if note wasnt found by id it will send a error message
 if(!noteById) return sendMessage(response, 404, 'Note was not found');
// esle send over the note that was found in body
 sendMessage(response, 200, noteById);
})

// lets you delete note from existing array by id on line 9
app.delete('/api/v1/notes/:id', (request, response) => {
// finds note by id
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);
// if note wasnt found by id it will send a error message
  if (noteIndex === -1) return response.status(404).json('Note not found');
// will delete note by its current index in array
  app.locals.notes.splice(noteIndex, 1);
// let user know it was successfuly deleted
  return sendMessage(response, 200, 'Note was successfully deleted');
})

export default app;
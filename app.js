const express = require('express'); // this brings in express.js and everything with it to use in the node.js server file
const app = express(); // app is the instance and creates an Express application
const cors = require('cors') // brings in Cross Origin Resource Sharing  and assigns to variable cors
const shortid = require('shortid'); // brings in shortid to generate random numbers for creating ids and assigns to shortid
app.use(express.json()); // tells express to parses incoming requests with JSON payloads and is based on body-parser.
app.use(cors()); // tells express / server to user Cross Origin Resource Sharing variable above

// This is telling express to create local a variable
// The app.locals object has properties that are local variables within the application and is assigned to notes
// This is just storing a bunch of pre generated objects in the varaible app.locals.notes
// Once set, the value of app.locals properties persist throughout the life of the application
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

// this is a sendMessage function that is a reusable piece of code to send status' of requests made below
// repsonse is the response object being sent by the server, code is the number assigned by the type of status
// message is either the object being passed back through the response or a string to give more information on the status code
const sendMessage = (response, code, message) => {
 return response.status(code).json(message)
}

// client endpoint to get app.locals.notes express variable
// sends the response code of 200 = ok and all the notes stored in the variable
app.get('/api/v1/notes', (request, response) => {
 sendMessage(response, 200, app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
  const { notes } = app.locals; // destructing app.locals.notes to be able to just use variable notes
  const { title, list, background } = request.body; // destructing title, list, background request information from request.body

  // 422 = unprosscable entry
  if (!title) return sendMessage(response, 422, 'Title is required'); // returns a response with 422 code and string message that user did not include title

  // generates a note with the clients request of background, title, list, as well generates a unique id
  const note = {
    id: shortid.generate(),
    background,
    title,
    list
  }
  notes.push(note); // pushes the note into the app.locals.notes express variable
  return response.status(201).json(note); // returns a response with 201 code and the new note created '201 = created'
});

app.put('/api/v1/notes/:id', (request, response) => {
  const { title, list, background } = request.body; // destructing title, list, background request information from request.body
  const { id } = request.params; // destructing id from the url being sent from the clients request
  const { notes } = app.locals; // destructing app.locals.notes to be able to just use variable notes

  let found = false; // creates varaible found and assigns bool false

  // creats variable newNotes
  // maps over app.localas.notes and finds the note id that matches the id sent in the client requests
  // when it matches the id stays the same but will then look and see if there is a background, title, or list
  // request.body property it will overwrite the original. if not it will assign it the previous one
  // after done mapping over notes it will assign all the notes to newNotes varialbe
  const newNotes = notes.map(note => {
    if (note.id == id) {
      found = true;
      return {
        id,
        background: background || note.background,
        title: title || note.title,
        list: list || note.list,
      }
    } else {
      return note
    }
  });
  if(!found) return sendMessage(response, 404, 'Note was not found'); // returns a response with 404 code and string message of note not found
  if(!title) return sendMessage(response, 400, 'Title is required'); // returns a response with 400 code and string message that user did not include title
  app.locals.notes = newNotes; // reassigning app.locals.notes to the newNotes variable created with the new note stored

  return sendMessage(response, 200, 'Note updated successfully'); // returns a response with 200 code and string message
});

// this client endpoint will find a specific note and return that note in the response
app.get('/api/v1/notes/:id', (request, response) => {
 const noteById = app.locals.notes.find(note => request.params.id == note.id); // finds the app.locals.notes specific note by id by matching the id by the one sent in the request
 if(!noteById) return sendMessage(response, 404, 'Note was not found'); // returns a response with 404 code and string message of note not found
 sendMessage(response, 200, noteById); // invokes the sendMessage function and sends the response, 200 status code of ok, and then the specific note found
})

// this client endpoint will find the specific note and delete the note from the app.locals.notes variable
app.delete('/api/v1/notes/:id', (request, response) => {
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id); // finds the index of the note id matching the request id in the app.locals.notes varialbe
  if (noteIndex === -1) return response.status(404).json('Note not found'); // returns a response with 404 code and string message of note not found
  app.locals.notes.splice(noteIndex, 1); // splices out the index found from the app.locals.notes variable
  return sendMessage(response, 200, 'Note was successfully deleted'); // returns a response with 200 code and string message
})


// exports the express instance of app to be used by other files
export default app;

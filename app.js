const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid');
app.use(express.json());
app.use(cors());

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

const sendMessage = (response, code, message) => {
 return response.status(code).json(message)
}

app.get('/api/v1/notes', (request, response) => {
 sendMessage(response, 200, app.locals.notes);
});

app.post('/api/v1/notes', (request, response) => {
  const { notes } = app.locals;
  const { title, list, background } = request.body;

  if (!title) return sendMessage(response, 422, 'Title is required');

  const note = {
    id: shortid.generate(),
    background,
    title,
    list
  }
  notes.push(note);
  return response.status(201).json(note);
  });

app.put('/api/v1/notes/:id', (request, response) => {
  const { title, list, background } = request.body;
  const { id } = request.params;
  const { notes } = app.locals;

  let found = false;
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

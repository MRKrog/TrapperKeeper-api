//add express module
const express = require('express');
//create an express application called app
const app = express();
//add cors module
const cors = require('cors')
//add shortid module to generate ids for notes
const shortid = require('shortid');
//app should parse request body to json
app.use(express.json());
//configure cors to allow api calls from other domains
app.use(cors());
//import fake notes data from notesData file
import { notesData } from './notesData'

//data stored in app.locals variable given to us by express
app.locals.notes = notesData

//method for returning response status codes and messages for CRUD methods below
const sendMessage = (response, code, message) => {
 return response.status(code).json(message)
}

//request to GET all notes data
app.get('/api/v1/notes', (request, response) => {
  //when a get request is sent to the above URL, the sendMessage method is sent with 
  //a 200 response code and the full notes data is sent as the response body
 sendMessage(response, 200, app.locals.notes);
});

//request to POST new notes data
app.post('/api/v1/notes', (request, response) => {
  //destructure notes data
  const { notes } = app.locals;
  //destructure request body information
  const { title, list, background } = request.body;

  //error handling - if body does not contain title, the sendMessage method is sent with 
  //a 422 response code and message of 'Title is required' for the response body
  if (!title) return sendMessage(response, 422, 'Title is required');

  //setting note variable as object with key value pairs for note data
  const note = {
    //generate new id for note
    id: shortid.generate(),
    //set value of request.body.background to background key
    background,
    //set value of request.body.title to title key
    title,
    //set value of request.body.list to list key
    list
  }
  //push the note object (created above) into the app.locals.notes array
  notes.push(note);
  //the sendMessage method is sent with a 201 response code 
  //and the note object for the response body
  return response.status(201).json(note);
  });

//request to PUT (edit) data for a specific note
app.put('/api/v1/notes/:id', (request, response) => {
  //destructure request body information
  const { title, list, background } = request.body;
  //destructure id from request.params
  const { id } = request.params;
  //destructure notes data
  const { notes } = app.locals;

  //set variable of found to false for tracking if note id is found in map below
  let found = false;
  //set variable of newNotes to a map method over the notes array
  const newNotes = notes.map(note => {
    //if the id from the request matches an id of a note in the notes array do the following:
    if (note.id == id) {
      //1. reassign the found variable to true
      found = true;
      //2. return an object with the edited notes information
      return {
        //use same id
        id,
        //set value of background to either updated request data or existing data
        background: background || note.background,
        //set value of title to either updated request data or existing data
        title: title || note.title,
        //set value of list to either updated request data or existing data
        list: list || note.list,
      }
      //if the id from the request does not match the note, just return that note object
    } else {
      return note
    }
  });
  //error handling - if found variable does not change to true, the sendMessage method is sent with 
  //a 404 response code and message of 'Note was not found' for the response body
  if(!found) return sendMessage(response, 404, 'Note was not found');
  //error handling - if body does not contain title, the sendMessage method is sent with 
  //a 400 response code and message of 'Title is required' for the response body
  if(!title) return sendMessage(response, 400, 'Title is required');
  //reassign app.locals.notes value to the value of the newNotes array
  app.locals.notes = newNotes;

  //return the sendMessage method with a 200 response code and 
  //message of 'Note updated successfully' for the response body 
  return sendMessage(response, 200, 'Note updated successfully');
});

//request to GET data for a specific note
app.get('/api/v1/notes/:id', (request, response) => {
  //use find method over notes array to find a note with an id that matches the request id
  //set that to a variable called noteById 
 const noteById = app.locals.notes.find(note => request.params.id == note.id);
 //if noteById does not exist (because no existing note with that id),
 //return the sendMessage method with a 404 response code and 
  //message of 'Note was not found' for the response body 
 if(!noteById) return sendMessage(response, 404, 'Note was not found');
 //otherwise (note exists) return the sendMessage method with a 200 response code and 
  //the data for the note specified by the id for the response body 
 sendMessage(response, 200, noteById);
})

//request to DELETE data for a specific note
app.delete('/api/v1/notes/:id', (request, response) => {
  //setting a variable of noteIndex to find the index of a note in the notes array that matches the request id
  const noteIndex = app.locals.notes.findIndex(note => note.id == request.params.id);
  //if the value of noteIndex is -1 (id's do not match, no index) return the sendMessage method with a 404 response code and 
  //message of 'Note not found' for the response body 
  if (noteIndex === -1) return response.status(404).json('Note not found');
  //if the note exists, splice/remove the note in the notes array at that index
  app.locals.notes.splice(noteIndex, 1);
  //return the sendMessage method with a 200 response code and 
  //a message of 'Note was successfully deleted' for the response body 
  return sendMessage(response, 200, 'Note was successfully deleted');
})

//export this file called app
export default app;

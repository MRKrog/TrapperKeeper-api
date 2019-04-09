import request from 'supertest';
import '@babel/polyfill';
import app from './app';
import shortid from 'shortid';

describe('app', () => {

  let notes;

  beforeEach(() => {
    notes = [
      { id: 1,
        title: 'Worf ToDo',
        background: '#ffe680',
        list: [
          { id: 'a',
            text: 'Eat food',
            isComplete: false
          },
        ]
      },
      { id: 2,
        title: 'Jake ToDo',
        background: '#ffe680',
        list: [
          { id: 'b',
            text: 'Do basic styling',
            isComplete: false
          },
        ]
      },
    ];
    app.locals.notes = notes;
  });

  describe('get "/api/v1/notes"', () => {

    it('should return a 200 status code and an array of notes', async () => {
      const response = await request(app).get('/api/v1/notes');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(notes);
    });

  });

  describe('post "/api/v1/notes"', () => {

    it('should return a 201 status code and push a new note', async() => {
      expect(app.locals.notes.length).toBe(2);

      let mockNote = { title: 'Get Shit Done', list: [] };
      shortid.generate = jest.fn().mockImplementation(()=> '10');

      const response = await request(app).post('/api/v1/notes')
        .send(mockNote);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: '10', ...mockNote });
      expect(app.locals.notes.length).toBe(3);
    });

    it('should return a 422 status code and give an error', async() => {
      expect(app.locals.notes.length).toBe(2);

      let mockNote = { title: '' };
      shortid.generate = jest.fn().mockImplementation(()=> '10');

      const response = await request(app).post('/api/v1/notes')
        .send(mockNote);

      expect(response.status).toBe(422);
      expect(response.body).toEqual("Title is required");
      expect(app.locals.notes.length).toBe(2);
    });

  });

  describe('put "/api/v1/notes:id"', () => {
    it('should return a status code 200 and rewrite the target object', async() => {
      const response = await request(app).put('/api/v1/notes/1')
      .send(
        { id: 1,
        title: 'hello',
        list: [
          { id: 'a',
            text: 'Eat food',
            isComplete: false
           },
         ]
      })
      expect(response.status).toEqual(200);
      expect(response.body).toEqual('Note updated successfully')
    });
  });

  describe('get "/api/v1/notes/:id"', () => {

    it('should return a 200 status and note body when note id exists', async () => {
      const response = await request(app).get('/api/v1/notes/1')
      const expected = app.locals.notes[0];
      expect(response.status).toEqual(200)
      expect(response.body).toEqual(expected)
    });

    it('should return a 404 status if no note with that id', async () => {
      const response = await request(app).get('/api/v1/notes/2234324')

      expect(response.status).toEqual(404)
      expect(response.body).toEqual('Note was not found')
    });

  });

  describe('delete "/api/v1/notes/:id"', () => {

    it('should return a status of 200 and change the length of the array', async () => {
      expect(app.locals.notes.length).toBe(2)
      const response = await request(app).delete('/api/v1/notes/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual('Note was successfully deleted');
      expect(app.locals.notes.length).toBe(1);
    })

    it('should return a status of 404 and NOT change the length of the array', async () => {
      expect(app.locals.notes.length).toBe(2);
      const response = await request(app).delete('/api/v1/notes/dogs');
      expect(response.status).toBe(404);
      expect(response.body).toEqual('Note not found');
      expect(app.locals.notes.length).toBe(2);
    });

  })

})

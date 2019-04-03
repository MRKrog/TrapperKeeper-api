import request from 'supertest';
import '@babel/polyfill';
import app from './app';
import shortid from 'shortid';

describe('/api/v1', () => {
  let notes;
  beforeEach(() => {
    notes = [
      { id: 12345, name: 'worf', type: 'cat' },
      { id: 23456, name: 'dave', type: 'dog' }
    ];
    app.locals.notes = notes;
  });
  
  describe('/api/v1/notes', () => {
    it('should return a 200 status code and an array of notes', async () => {
      const response = await request(app).get('/api/v1/notes');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(notes);
    });
  });
  
  describe('post/notes', () => {
    it('should return a 201 status code and push a new note', async() => {
      expect(app.locals.notes.length).toBe(2);

      let noteInfo = { name: 'ozzi', type: 'pug'}
      shortid.generate = jest.fn().mockImplementation(()=> '10');

      const response = await request(app).post('/api/v1/notes')
      .send(noteInfo);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: '10',
        ...noteInfo
      });
      expect(app.locals.notes.length).toBe(3);
    });

    it('should return a 422 status code and give an error', async() => {
      expect(app.locals.notes.length).toBe(2);

      let noteInfo = { name: 'ozzi'}
      shortid.generate = jest.fn().mockImplementation(()=> '10');

      const response = await request(app).post('/api/v1/notes')
      .send(noteInfo);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
       "message": "type is required",
       "success": "false",
      });
      expect(app.locals.notes.length).toBe(2);
    });
  });
});

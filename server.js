import app from './app'
app.set('port', 3001);

app.listen('3001', () => {
  console.log('Server is now running at http://localhost:3001');
})
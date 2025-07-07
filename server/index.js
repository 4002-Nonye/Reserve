const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', () => {
  console.log('This is my home page ');
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

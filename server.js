const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/index.js');



// Helper method for generating unique ids
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.use('/api', apiRoutes);


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Sends to the homepage if a pathing issue exists
app.get('*', (req, res) => res.redirect('/'));




app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});
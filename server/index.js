require('dotenv').config();
console.log(process.env);

const express = require('express');
const cors = require('cors');
const { todoRouter } = require('./routes/todo.js'); 
const { query } = require('./db'); 
const port = process.env.PORT || 3001;
const path = require('path');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, '../public')));


app.use('/tasks', todoRouter); 


app.get("/status", (req, res) => {
    res.status(200).json({ result: 'success' });
});

app.get("/tasks", async (req, res) => {
    try {
        const result = await query('SELECT * FROM task');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});


app.post("/tasks/new", async (req, res) => {
    try {
        const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description]);
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});


app.delete("/tasks/delete/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const quarry = require('../db.js');
const todoRouter = express.Router();


todoRouter.get("/", async (req, res) => {
    try {
        const result = await quarry('SELECT * FROM task');
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

todoRouter.post("/new", async (req, res) => {
    try {
        const result = await quarry('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description]);
        res.status(200).json({ id: result.rows[0].id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

todoRouter.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await quarry('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
        res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
});

module.exports = { todoRouter };


/*const express = require('express')
const quarry = require('../db.js')
const todoRouter = express.Router()

todoRouter.get("/", async(req, res) => {
    try {
        const result = await quarry('SELECT * FROM task')
        const rows = result.rows ? result.rows : []
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

todoRouter.post("/new",async(req, res) => {
    try {
        const result = await quarry('INSERT INTO task (description) VALUES ($1) RETURNING *', [req.body.description])
        res.status(200).json({id:result.rows[0].id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

todoRouter.delete("/delete/:id", async(req, res) => {
    const id = Number(req.params.id)
    try {
        const result = await quarry('DELETE FROM task WHERE id = $1 RETURNING *', [id])
        res.status(200).json({id:id})
    } catch (error) {            
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})*/


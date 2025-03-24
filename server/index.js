require('dotenv').config();
console.log(process.env);

const express = require('express');
const cors = require('cors');
const { todoRouter } = require('./routes/todo.js'); // مسیر صحیح برای وارد کردن todoRouter
const { query } = require('./db'); // وارد کردن query از db
const port = process.env.PORT || 3001;
const path = require('path');

// ساخت اپلیکیشن express
const app = express();

// استفاده از میدل‌ویرها
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// سرو کردن فایل‌های استاتیک (مثل فایل‌های JS, CSS)
app.use(express.static(path.join(__dirname, '../public')));

// استفاده از روت‌های todoRouter
app.use('/tasks', todoRouter); // مسیر روت جدید به جای '/new' 

// روت برای پیام "success"
app.get("/status", (req, res) => {
    res.status(200).json({ result: 'success' });
});

// روت برای دریافت تمام تسک‌ها
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

// روت برای اضافه کردن تسک جدید
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

// روت برای حذف تسک
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

// فعال‌سازی سرور
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

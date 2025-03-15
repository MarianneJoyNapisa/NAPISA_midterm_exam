const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

//To connect this to public where index.html file, the interface is located
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];
let idCounter = 1;

// Create a new task
app.post('/task', (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Task name is required' }); //if taskname is none then display error

    const newTask = { id: idCounter++, name, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks
app.get('/task', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const task = tasks.find(t => t.id == id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (name) task.name = name;
    if (description) task.description = description;

    res.json(task);
});

// Delete a task
app.delete('/task/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.json({ message: 'Task deleted' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

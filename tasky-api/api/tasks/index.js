import express from 'express';
import Task from './taskModel';
import asyncHandler from 'express-async-handler';
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error fetching tasks', error: error.message });
    }
});

// Create a new task
router.post('/', asyncHandler(async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
}));
   
// Update Task
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Task.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'Task Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});


// delete Task
router.delete('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Task.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});
export default router;

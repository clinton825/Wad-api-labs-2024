import express from 'express';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

// Register(Create)/Authenticate User
router.post('/', async (req, res) => {
    try {
        if (req.query.action === 'register') {
            // Save new user to database
            await new User(req.body).save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } else {
            // Authenticate user
            const user = await User.findOne(req.body);
            if (!user) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed' });
            }
            res.status(200).json({ code: 200, msg: 'Authentication Successful', token: 'TEMPORARY_TOKEN' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;

        const result = await User.updateOne(
            { _id: req.params.id },
            req.body
        );

        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to Update User' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

export default router;

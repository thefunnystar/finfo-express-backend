const express = require('express');
const router = express.Router();
const { Contact, User } = require('../models'); // Import the Contact and User models

router.post('/add', async (req, res) => {
    try {
        const { userEmail, contactId, contactName, relationship, savedPhotos, sharedNotes, privateNotes, contactInfo } = req.body;

        const user = await User.findOne({ email: userEmail }); // Find user by email

        if (!user) {
            return res.status(400).send('User does not exist');
        }

        const newContact = new Contact({
            userEmail,
            contactId,
            contactName,
            relationship,
            savedPhotos,
            sharedNotes,
            privateNotes,
            contactInfo
        });

        await newContact.save();
        res.status(201).send('Contact added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/contacts', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const contacts = await Contact.find({ userId: user._id });
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const contacts = await Contact.find({ userEmail });

        if (!contacts.length) {
            return res.status(404).send('No contacts found for this user');
        }

        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).send('Server error');
    }
});

router.put('/:contactId', async (req, res) => {
    try {
        const { relationship, savedPhotos, sharedNotes, privateNotes, contactInfo } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.contactId,
            { relationship, savedPhotos, sharedNotes, privateNotes, contactInfo },
            { new: true }
        );

        if (!contact) {
            return res.status(404).send('Contact not found');
        }

        res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.delete('/:contactId', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.contactId);

        if (!contact) {
            return res.status(404).send('Contact not found');
        }

        res.status(200).send('Contact deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;

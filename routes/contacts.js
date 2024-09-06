const express = require('express');
const router = express.Router();
const { Contact, User } = require('../models'); // Import the Contact and User models

router.post('/add', async (req, res) => {
    try {
        const { userId, contactId, relationship, savedPhotos, sharedNotes, privateNotes, contactInfo } = req.body;

        // Validate if user exists before adding a contact
        const user = await User.findById(userId);
        const contact = await User.findById(contactId);

        if (!user || !contact) {
            return res.status(400).send('User or Contact does not exist');
        }

        const newContact = new Contact({
            userId,
            contactId,
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

router.get('/:userId', async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.params.userId }).populate('contactId', 'name email profilePicture');
        if (!contacts || contacts.length === 0) {
            return res.status(404).send('No contacts found');
        }
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
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

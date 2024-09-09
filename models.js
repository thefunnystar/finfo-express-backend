const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // gmailAccount: { type: Boolean },
    profilePicture: { type: String },
    name: { type: String, required: true }
});

const contactSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, ref: 'User' },
    contactId: { type: String },
    contactPhoto: { type: String },
    contactName: { type: String, required: true },
    relationship: { type: String },
    savedPhotos: [{ type: String }],
    sharedNotes: [{ position: Number, content: String }],
    privateNotes: [{ position: Number, content: String }],
    contactInfo: [{ platform: String, contact: String }]
});

const noteSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' },
    contactId: { type: String, required: true, ref: 'User' },
    content: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

//add a schema for posting moments
//other app/account info: (tbd at very end)

module.exports = {
    User: mongoose.model('User', userSchema),
    Contact: mongoose.model('Contact', contactSchema),
    Note: mongoose.model('Note', noteSchema)
};

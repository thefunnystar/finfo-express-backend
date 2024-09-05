const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true, default: () => mongoose.Types.ObjectId() }, // Generate a random ID
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // gmailAccount: { type: Boolean },
    profilePicture: { type: String },
    name: { type: String, required: true }
});

// Pre-save middleware to set gmailAccount based on email
// You will have to remove this code later
// accountSchema.pre('save', function (next) {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     this.gmailAccount = emailRegex.test(this.email);
//     next();
// });

//if there is no id, generate a small integer to be used as a private (client-side) id
const contactSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' },
    contactId: { type: String, ref: 'User' },
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
//add a schema for promises
//other app/account info: (tbd at very end)

module.exports = {
    User: mongoose.model('User', userSchema),
    Contact: mongoose.model('Contact', contactSchema),
    Note: mongoose.model('Note', noteSchema)
};
//How can I make this a premium version of this app better for real estate or business
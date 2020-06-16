/*
const router = require('express').Router();
const User = require('../models/users.model');

router.route('/signup').post((req,res) => {
    const {body} = req;
    var {
        firstName,
        lastName,
        email,
        password
    } = body;

    email = email.toLowerCase();

    const newUser = new User();

    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+err));
    });

    module.exports = router;
*/
module.exports = function (app) {
    var userContact = require('../controllers/Controllers');

    app.route('/login').post(userContact.login);
    app.route('/logout/:id').delete(userContact.logout);
    app.route('/register').post(userContact.register);
    app.route('/:user').get(userContact.getContacts)
        .post(userContact.addContact);
    app.route('/:user/:id').delete(userContact.removeContact);
    app.route('/edit/:id').get(userContact.getContact).put(userContact.updateContact);
};
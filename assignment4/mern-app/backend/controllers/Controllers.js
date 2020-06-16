
//const request = require('request');

var mongoose = require('mongoose'), 
  User = mongoose.model('Users'),
  Session = mongoose.model('Sessions'),
  Contact = mongoose.model('Contacts');

exports.login = function(req, res) {
  const {body} = req;
  var {
    email,
    password
  } = body;
  if (!email){
    return res.json('No email');
  };
  if(!password){
    return res.json('No passwrod');
  };


  email = email.toLowerCase();
  
  
  User.find({email: email}, (err, test) => {
    if(err){
      return res.json('Error: ');
    }
    if (test.length != 1) {
      return res.json('Error: Invalid email');
    };

    const test1 = test[0];
    if(!test1.validatePassword(password)) {
      return res.json('Error: Invalid password');
    };

    var userSession = new Session();
    userSession.email = email;
    userSession.save((err, doc) => {
      if (err) {
        res.json('Error: Server error');
      };
      
      res.send({
        token: doc._id
      });
    });

  });
  
  /*.then(() => res.json(test.fisrtName))
  .catch(err => res.status(400).json('Error: '+err));
  console.log(test.email);*/
};

//LOGOUT (DELETE)
exports.logout = function(req,res) {
  Session.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }

    const response = {
      message: "User successfully logged out."
    };
    return res.status(200).send(response);
  });
};

//REGISTRATION (POST)
exports.register = function(req, res) {
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
    };

//Adding new contact
exports.addContact = function(req,res) {
  const {body} = req;
  var {
    name,
    email,
    phone,
  } = body;

  if (!name){
    return res.json('No name');
  };
  if(!phone){
    return res.json('No phone');
  };

  if (email) {
  email = email.toLowerCase();
  };

  //Find email of the logged in user (creator)
  Session.findById(req.params.user, (err,session) => {
    if (err) return res.status(500).send(err);
    
    createdEmail = session.email;
  
    Contact.find({name: name}, (err, contact) => {
      if (err) return res.status(500).send(err);
      if(contact.length===0) {
        const newContact = new Contact()
        newContact.name = name;
        newContact.phone = phone;
        newContact.createdBy = [createdEmail];
        if (email) newContact.email = email;
        console.log(newContact);
        newContact.save()
        .then(() => res.json('Contact added!'))
        .catch(err => res.status(400).json('Error1: '+err));
      }
      else{
        const existingContact = contact[0];
        if (existingContact.createdBy.indexOf(createdEmail) === -1){
          existingContact.createdBy.push(createdEmail);
        }
        var newContact = new Contact();
        newContact = existingContact;
        console.log(newContact);
        newContact.save()
        .then(() => res.json('Contact added!'))
        .catch(err => res.status(400).json('Error2: '+err));
      }

    });
    //Creating the model


});
};

exports.getContacts = function(req, res) {
  Session.findById(req.params.user, (err,session) => {
    if (err) return res.status(500).send(err);
    
    createdEmail = session.email;
  
    Contact.find({createdBy: createdEmail})
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: '+err));
    });
};

exports.getContact = function(req, res) {
    Contact.findById(req.params.id)
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: '+err));
};

exports.updateContact = function(req, res) {/*
  Session.findById(req.params.user, (err,session) => {
    if (err) {
      return res.status(500).send(err);
    }
    createdEmail = session.email;
    Contact.findById(req.params.id, (err, contact) => {
      console.log(contact);
        if (contact.createdBy.indexOf(createdEmail) === -1){
          return res.json("Error: You aren't the owner");
        }
        else{*/
          Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, contact) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send({message: "Contact updated succesfully", id: req.params.id});
          })/*
        }
    });
  });*/
};

exports.removeContact = function(req, res) {
  Session.findById(req.params.user, (err,session) => {
    if (err) {
      return res.status(500).send(err);
    }
    createdEmail = session.email;
    Contact.findById(req.params.id, (err, contact) => {
        if (contact.createdBy.indexOf(createdEmail) === -1){
          return res.json("Error: You aren't the owner");
        }
        else{
          Contact.findByIdAndDelete(req.params.id, (err, contact) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send({message: "Contact deleted succesfully", id: req.params.id});
          })
        }
    });
  });
}
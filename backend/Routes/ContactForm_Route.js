const express = require('express');
const router = express.Router();
// const ensureAuthenticated = require('../Middleware/Authantication');

const { formValidations } = require('../Middleware/UserFormValidatioin')
const { createContact, getContactList, deleteContact, editContactById, updateContact } = require('../Controller/ContactForm_Controller')

router.post('/createContact', formValidations, createContact)
// router.post('/createContact', createContact)
router.get('/getContactList', getContactList);
router.delete('/deleteContact/:id', deleteContact)
router.get('/editContactById/:id', editContactById)
router.put('/updateContact', updateContact)

module.exports = router;
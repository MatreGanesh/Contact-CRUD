const ContactForm = require('../Model/ContactForm');

const createContact = async (req, res) => {
    try {
        console.log("Hiiii");

        const { name, email, contact } = req.body;


        // Check if a contact with the same email or contact number already exists
        const existingContact = await ContactForm.findOne({
            $or: [{ email }, { contact }]
        });

        if (existingContact) {
            return res.status(400).json({
                message: "Contact already exists with the same email or contact number.",
                errors: [
                    existingContact.email === email ? "Email is already in use." : null,
                    existingContact.contact === contact ? "Contact number is already in use." : null
                ].filter(error => error)  // Only send non-null errors
            });
        }

        // Create a new contact
        const newContact = new ContactForm({
            name,
            email,
            contact
        });

        // Save the new contact to the database
        await newContact.save();

        // Send a success response
        res.status(201).json({ message: 'Contact created successfully!' });

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: 'Error creating contact. Please try again.' });
    }
};

const getContactList = async (req, res) => {
    // console.log('-----LoggedIn in user Details-----', req.user)
    try {
        const allContactList = await ContactForm.find({});

        return res.status(200).json({ message: "User contact list fetched successfully.", allContactList: allContactList });

    } catch (error) {
        console.error("Error in Fetch Contact List:", error);
        return res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUser = await ContactForm.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(400).json({ message: 'User not found in Contact List' });
        }

        console.log("User Deleted Successfully ", deleteUser);
        return res.status(201).json({ message: 'Server error, please try again later.', deleteUser: deleteUser });

    } catch (error) {
        console.error("Error in Fetch Contact List:", error);
        return res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
}

const editContactById = async (req, res) => {
    // console.log('-----LoggedIn in user Details-----', req.user)
    try {
        const { id } = req.params;

        const getUserContact = await ContactForm.findById(id);
        // console.log("User Found By Id Successfully", getUserContact)

        if (!id) {
            return res.status(400).json({ message: 'User not found in Contact List' });
        }

        console.log("User Found Successfully ", getUserContact);
        return res.status(201).json({ message: 'User Contact Details Found Successfully!.', getContact: getUserContact });

    } catch (error) {
        console.error("Error in Fetch Contact List:", error);
        return res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
}


const updateContact = async (req, res) => {
    try {
        const { userDetail } = req.body;

        // Ensure userDetail and email/contact are provided
        if (!userDetail.name || !userDetail.email || !userDetail.contact || !userDetail._id) {
            return res.status(400).json({ message: "Name, Email, and Contact are required for update." });
        }

        // Check if any other user has the same email (except the current user)
        const existingUserEmail = await ContactForm.findOne({
            email: userDetail.email,
            _id: { $ne: userDetail._id } // Ensure it's not the current user being updated
        });

        // Check if any other user has the same contact (except the current user)
        const existingUserContact = await ContactForm.findOne({
            contact: userDetail.contact,
            _id: { $ne: userDetail._id } // Ensure it's not the current user being updated
        });

        if (existingUserEmail) {
            return res.status(400).json({ message: "Email already exists. Please use a different email." });
        }

        if (existingUserContact) {
            return res.status(400).json({ message: "Contact number already exists. Please use a different contact." });
        }

        // Update the contact details for the user
        const editContact = await ContactForm.findByIdAndUpdate(userDetail._id, userDetail, { new: true });

        if (!editContact) {
            return res.status(404).json({ message: "Contact details not found for the given user ID." });
        }

        // Return the updated user details
        return res.status(200).json({ editContact });

    } catch (error) {
        console.error("Error in updating contact:", error);
        // If an error occurs during the update process, return a 500 error
        return res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
};


module.exports = { createContact, getContactList, deleteContact, editContactById, updateContact };

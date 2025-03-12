import Contact from "../Models/ContactModel.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message, contact } = req.body;
    
    
    if (!name || !email || !message || !contact) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const contactPage = await Contact.create({ name, email, message, contact });

    res.status(201).json({ success: true, contactPage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll(); 
    res.status(200).json({ success: true, contacts }); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

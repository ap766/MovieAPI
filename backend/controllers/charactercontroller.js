// So basically in getallcharacters , we are making use of ref and populatre the relations field so all the relations field are being sent in the response to the frontend.
//even for getacharacter


const Character = require('../models/charactermodel')

// Create a new character
const createCharacter = async (req, res) => {
    const { name, age, photos, gender, occupation } = req.body;
    
    // You can initialize an empty relations array
    const relations = [];

    let emptyFields = [];
    if (!name) {
        emptyFields.push('name');
    }
    if (!age) {
        emptyFields.push('age');
    }
    if (!photos) {
        emptyFields.push('photos');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const user_id = req.user._id;
        const character = await Character.create({
            name,
            age,
            photos,
            gender,
            occupation,
            user_id,
            relations // Include the empty relations array
        });

        res.status(200).json({ character });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all characters
const getAllCharacters = async (req, res) => { 
    console.log(req.user)
    try {
        const user_id = req.user._id;
        const characters = await Character.find({ user_id })
            .populate('relations') // Populate the relations field
            .sort({ createdAt: -1 });

        res.status(200).json({ characters });
    } 
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}


    //update a character
const updateCharacter = async (req, res) => {
    const { id } = req.params
// Assuming the ID is passed in the URL
        
  const updates = req.body; // Assuming the updated fields are provided in the request body

try {
    const character = await Character.findById(id);

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Update the character with the new data
    Object.assign(character, updates);

    // Save the updated character
    await character.save();

    res.status(200).json({ character });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a character
const deleteCharacter = async (req, res) => {
  const { id } = req.params

  const character = await Character.findOneAndDelete({_id: id})

  if(!character) {
    return res.status(400).json({error: 'No such character exists'})
  }

  res.status(200).json(character)
}
    
// Get a character
const getCharacter = async (req, res) => {
    const { id } = req.params;
    try {
        const character = await Character.findById(id).populate('relations');

        if (!character) {
            return res.status(404).json({ error: 'No such character' });
        }

        res.status(200).json({ character }); // Send the character object
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = {createCharacter,getAllCharacters,
getCharacter,
updateCharacter,deleteCharacter,
}


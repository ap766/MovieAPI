
//Now problem is the othercharacterid-who it is relation to - for create in req.body but what abt update and delete - how to update character lets see
//We assume characterid is somehow being sent in the request body(that is to whom the relation is being determined)
//we have a problem here that we get all the relations because we dont know what user_id it is associated with- my question is why tho ? let just add a user_id in the model like we did for character.
// the before 3 lines are mostly problems 


//Also we have to seperately update for the relations array in character model we just add the relation id to the array.
const Character = require('../models/charactermodel');
const Relation = require('../models/relationmodel');
// Create a new relation
// relationcontroller.js
const createRelation = async (req, res) => {
const user_id = req.user._id;

    const { idCharacter, otherCharacterid, name, description } = req.body;

  try {
    const relation = await Relation.create({
      idCharacter,
      name,
      description,
      user_id
    });
    console.log(req.body)
    console.log(idCharacter)
    console.log(otherCharacterid)
    // Update the character's relations array
    const othercharacter = await Character.findById(otherCharacterid);

    console.log(othercharacter)
    if (othercharacter) {
      othercharacter.relations.push(relation._id);
      await othercharacter.save();
    }

    res.status(200).json({ relation });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log("hey")
  }
};

//get all relations
const getAllRelations = async (req, res) => { 
    try {
        const user_id = req.user._id
        const relations = await Relation.find({user_id}).sort({createdAt: -1})//should it be based on created at ?
        res.status(200).json({ relations })
    } 
    catch (err) {
        res.status(400).json({ error: err.message })
    }
    }

  // Update a relation
const updateRelation = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const relation = await Relation.findByIdAndUpdate(id, updates, { new: true });

    if (!relation) {
      return res.status(404).json({ error: 'Relation not found' });
    }

    // Update character's relations array
    const character = await Character.findById(relation.idCharacter);

    if (character) {
      // In this case, we're using the 'id' of the updated relation
      character.relations.pull(id);
      character.relations.push(relation._id);
      await character.save();
    } else {
      // Handle case where character doesn't exist
      return res.status(404).json({ error: 'Character not found' });
    }

    res.status(200).json({ relation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


/// Update a relation
/*
const updateRelation = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const relation = await Relation.findByIdAndUpdate(id, updates, { new: true });

    if (!relation) {
      return res.status(404).json({ error: 'Relation not found' });
    }

    res.status(200).json({ relation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
*/
// Delete a relation
const deleteRelation = async (req, res) => {
  const { id } = req.params;

  try {
    const relation = await Relation.findByIdAndDelete(id);

    if (relation) {
      // If the relation was deleted, update character's relations array
      const character = await Character.findById(relation.idCharacter);

      if (character) {
        // Remove the relation ID from the character's relations array
        character.relations.pull(id); // Use the 'id' of the relation being deleted
        await character.save();
      } else {
        // Handle case where character doesn't exist
        return res.status(404).json({ error: 'Character not found' });
      }
    } else {
      // Handle case where relation doesn't exist
      return res.status(404).json({ error: 'Relation not found' });
    }

    res.status(200).json({ relation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/*
// Delete a relation
const deleteRelation = async (req, res) => {
  const { id } = req.params;

  try {
    const relation = await Relation.findByIdAndDelete(id);

    if (relation) {
      // If the relation was deleted, update character's relations array
      const character = await Character.findById(relation.idCharacter);
      if (character) {
        character.relations.pull(relation._id);
        await character.save();
      }
    }

    res.status(200).json({ relation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
*/
// Get a relation
const getRelation = async (req, res) => {
    const { id } = req.params
    try {
        const relation = await Relation.findById(id)
        res.status(200).json({ relation })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createRelation, getAllRelations, updateRelation, deleteRelation, getRelation }


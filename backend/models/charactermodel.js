const mongoose = require('mongoose');


const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
	photos: {
    type: Array,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  relations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Relation'
  }
],
    user_id: {
    type: String,
    required: true
  }


}, { timestamps: true });



module.exports =  mongoose.model('Character', characterSchema);

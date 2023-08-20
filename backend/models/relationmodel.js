const mongoose = require('mongoose')

const relationSchema = new mongoose.Schema({
  idCharacter:{
  type: mongoose.Schema.Types.ObjectId,
  required: true
},
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id : {
    type: String,
    required: true
  }

});


module.exports =  mongoose.model('Relation', relationSchema);
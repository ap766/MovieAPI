const express = require('express')
const { getAllCharacters, getCharacter, createCharacter, updateCharacter, deleteCharacter } = require('../controllers/charactercontroller')
const { getAllRelations, getRelation, createRelation, updateRelation, deleteRelation } = require('../controllers/relationcontroller')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all routes
router.use(requireAuth)

//character routes
router.get('/characters', getAllCharacters)

router.post('/characters', createCharacter)

router.get('/characters/:id', getCharacter)

router.patch('/characters/:id', updateCharacter)

router.delete('/characters/:id', deleteCharacter)

//relation routes

router.get('/relations', getAllRelations)

router.post('/relations', createRelation)

router.get('/relations/:id', getRelation)

router.patch('/relations/:id', updateRelation)

router.delete('/relations/:id', deleteRelation)

module.exports = router






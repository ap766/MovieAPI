const express = require('express')

const {exportdata,exportdatapdf,exportdatacsv} = require('../controllers/reportcontroller')

const router = express.Router()


const requireAuth = require('../middleware/requireAuth')

//require auth for all routes
router.use(requireAuth)

// the routes
router.get('/exportdata',exportdata)

router.get('/exportdatapdf',exportdatapdf)

router.get('/exportdatacsv',exportdatacsv)

module.exports = router





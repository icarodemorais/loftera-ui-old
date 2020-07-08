var express = require('express');
var router = express.Router();
var CandidateController = require('./controllers/CandidateController')
var RealEstateController = require('./controllers/RealEstateController')
const { ensureAuthenticated, forwardAuthenticated } = require('./controllers/AuthController')
const { isAdmin } = require('./controllers/AccessController')
const ac = require('./config/access_control');

// Dashboard
router.get('/', [ensureAuthenticated, isAdmin])

// Candidate
router.get('/candidate', ensureAuthenticated, CandidateController.index)
router.get('/candidates', [ensureAuthenticated, isAdmin, CandidateController.findAll])

// RealEstate
router.get('/realestate', ensureAuthenticated, RealEstateController.index)
router.get('/realestate/:id', ensureAuthenticated, RealEstateController.findById)
router.post('/realestate/solicitation', ensureAuthenticated, RealEstateController.storeSolicitation)

// Calendar
router.get('/calendar', [ensureAuthenticated, isAdmin])

module.exports = router;
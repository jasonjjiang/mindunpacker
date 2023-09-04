const express = require('express');
const router = express.Router();
const journalCtrl = require('../../controllers/api/journal');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/journals', ensureLoggedIn, journalCtrl.getAllJournal);

module.exports = router;
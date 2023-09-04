const express = require('express');
const router = express.Router();
const journalCtrl = require('../../controllers/api/journal');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/all', ensureLoggedIn, journalCtrl.getAllJournal);
router.get('/:id', ensureLoggedIn, journalCtrl.getJournal);
router.post('/create', ensureLoggedIn, journalCtrl.createJournal);
router.put('/update/:id', ensureLoggedIn, journalCtrl.updateJournal);
router.delete('/delete/:id', ensureLoggedIn, journalCtrl.deleteJournal);

module.exports = router;
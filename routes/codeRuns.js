const express = require('express');
const router = express.Router();
const codeRunController = require('../controllers/codeRunController');

router.post('/submit', codeRunController.submitCode);

router.get('/submitted-code', codeRunController.getSubmitedCode);



module.exports = router;

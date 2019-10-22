const express = require('express');
const router = express.Router();

const { emailUser } = require('../controllers/handleEmail');

router.route('/handleEmail').post(emailUser);

module.exports = router;

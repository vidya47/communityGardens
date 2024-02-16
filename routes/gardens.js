const express = require('express');
const { getGardens, addGardens } = require('../controllers/gardens');
const router = express.Router();

router.route('/')
    .get(getGardens)
    .post(addGardens);

module.exports = router;
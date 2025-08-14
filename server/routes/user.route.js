const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser} = require('../controllers/user.controller');

router.get('/me', getUser);
router.put('/me', updateUser);
router.delete('/me', deleteUser);

module.exports = router;
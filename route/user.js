const router = require('express').Router();

const { createUser, listAllUsers, updateUser } = require('../controller/user');

router.route('/create/user').post(createUser);
router.route('/users').get(listAllUsers);
router.route('/update/user').put(updateUser);


module.exports = router;
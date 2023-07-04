const express = require('express');

const routes = function (ProfileInitialSetupToken, userProfile) {
    const ProfileInitialSetup = express.Router();
    const controller = require('../controllers/profileInitialSetupController')(ProfileInitialSetupToken, userProfile);
    ProfileInitialSetup.route('/getInitialSetuptoken')
        .post(controller.getSetupToken);
    ProfileInitialSetup.route('/ProfileInitialSetup').post(controller.setUpNewUser)
    ProfileInitialSetup.route('/validateToken').post(controller.validateSetupToken)

    return ProfileInitialSetup;
};

module.exports = routes;

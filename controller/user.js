const async = require('async');
const userModel = require('../model/user');
const logger = require('../logger/logger');

console.log('object :>> ');
exports.createUser = function (req, res) {
    logger.info(`Create user API initiated. body: ${JSON.stringify(req.body)}`)
    const { userId } = req.body;
    var userData = {};
    async.series([function (callback) {
        userModel.findOne({ userId: userId }, function (err, res) {
            if (!err) {
                userData = res;
                process.nextTick(callback, null);
            } else {
                process.nextTick(callback, "Database error.");
            }
        });
    }, function (callback) {
        if (!!userData && !!userData.userId) {
            process.nextTick(callback, 'User already exists.');
        } else {
            userModel.create(req.body, function (err, user) {
                if (!err) {
                    process.nextTick(callback, null);
                } else {
                    process.nextTick(callback, err);
                }
            });
        }
    }], function (err) {
        if (!err) {
            res.status(200).json({ message: "User Created." });
            logger.info(`Create user API execution completed.`)
        } else {
            logger.error(`Create user API error: ${err}`)
            res.status(501).json({ message: err });
        }
    })
}

exports.listAllUsers = async function (req, res) {
    logger.info(`Get users API initiated. body: ${JSON.stringify(req.body)}`)
    try {
        const users = await userModel.find({});
        res.status(200).json(users);
        logger.info(`Get users API execution completed.`)
    } catch (err) {
        logger.error(`Get users API error: ${err}`)
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = function (req, res) {
    logger.info(`Update user API initiated. body: ${JSON.stringify(req.body)}`)
    const { userId } = req.body;
    async.series([function (callback) {
        userModel.findOne({ userId: userId }, function (err, res) {
            if (!err) {
                userData = res;
                process.nextTick(callback, null);
            } else {
                process.nextTick(callback, "Database error.");
            }
        });
    }, function (callback) {
        if (!!userData && !!userData.userId) {
            userModel.findOneAndUpdate({ userId: userData.userId }, {
                $set: {
                    fullName: req.body.fullName
                }
            }, { upsert: false }, function (err, user) {
                if (!err) {
                    process.nextTick(callback, null);
                } else {
                    process.nextTick(callback, err);
                }
            });
        } else {
            process.nextTick(callback, 'User not exists.');
        }
    }], function (err) {
        if (!err) {
            res.status(200).json({ message: "User Updated." });
            logger.info(`Update user API execution completed.`)
        } else {
            logger.error(`Update user API error: ${err}`)
            res.status(501).json({ message: err });
        }
    })

}
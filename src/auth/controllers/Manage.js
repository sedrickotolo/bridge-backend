const User = require("../models/User");
const Candidate = require("../models/Candidate");
const Collaborator = require("../models/Collaborator");
const HTTPStatus = require("http-status");
const constants = require("../config/constants");
const privileges = require("../utils/privileges");
const transporter = require("../services/mailer");
const templates = require("../utils/email.templates");
const msgs = require("../utils/email.msgs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const validateRegisterInput = require("../utils/validations.register");
const validateLoginInput = require("../utils/validations.login");
const validateForgotPwdInput = require("../utils/validations.forgot");
const validatePwdUpdateInput = require("../utils/validations.update.pwd");
const validateCandidateInput = require("../utils/validations.candidate");

const manage = {
    activateUser: async(req, res) => {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, { hasAccess: true },
                (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json(result);
                    }
                }
            );
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    deactivateUser: async(req, res) => {
        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, { hasAccess: false },
                (err, result) => {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json(result);
                    }
                }
            );
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    findUser: (req, res, next) => {
        if (req.user.userName === req.query.userName) {
            User.findOne({
                userName: req.query.userName,
            }).then((userInfo) => {
                if (userInfo != null) {
                    console.log("user found in db from findUsers");
                    res.status(200).json(userInfo);
                } else {
                    console.error("no user exists in db with that username");
                    res.status(401).send("no user exists in db with that username");
                }
            });
        } else {
            console.error("jwt id and username do not match");
            res.status(403).send("username and jwt token do not match");
        }
    },
    findUserById: (req, res, next, id) => {
        User.findById(id).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "No user found with these credentials!",
                });
            }
            req.profile = user;
            next();
        });
    },

    deleteUser: (req, res, next) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                return res.json({ success: false, message: "Some Error" });
            } else if (user) {
                return res.status(200).json({
                    success: true,
                    message: user.userName + " deleted successfully",
                });
            } else {
                return res.status(400).json({
                    success: true,
                    message: user.userName + " deleted successfully",
                });
            }

        });
    },

    //
    updateUser: (req, res, next) => {
        User.findByIdAndUpdate(req.body.id, req.body, (err, user) => {
            if (err) {
                res.json({ 'success': false, 'message': 'Some Error', 'error': err });
            } else if (user) {
                console.log(user);
                res.json({ 'success': true, 'message': 'Updated successfully', user });
            } else {
                res.status(400).json({ success: true, message: "user does not exist in the db" })
            }
        })
    },

    updateCollaborator: (req, res, next) => {
        let query = { _id: req.params.id };
        let updateDetails = req.body;
        Collaborator.findOneAndUpdate(query, updateDetails, (error, response) => {
            if (error) {
                return res.status(HTTPStatus.BAD_GATEWAY).json(e);
            } else if (response) {
                return res.status(HTTPStatus.OK).json(response);
            } else {
                return res.status(HTTPStatus.BAD_REQUEST);
            }
        });
    },
    addCollaborator: async(req, res, next) => {
        try {
            //get the ID of the one requesting:
            let id = req.params.id;
            let colab = new Collaborator(req.body);
            await colab.save((error, savedData) => {
                if (error) {
                    return res.status(500).json(error);
                } else {
                    return res.status(201).json(savedData);
                }
            });
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    deleteCollaborator: (req, res, next) => {
        try {
            let query = { _id: req.params.id };
            Collaborator.findOneAndDelete(query, (error, response) => {
                if (error) {
                    return res
                        .status(400)
                        .json({ error: errorHandler.getErrorMessage(err) });
                } else {
                    res.status(200).send("user deleted");
                }
            });
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },
}

module.exports = manage;